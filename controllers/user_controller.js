const User = require("../models/user");
const Activity = require("../models/activity");

const { Op } = require("sequelize");

exports.loginActivity = async (req, res) => {
    try {

        const previousActivity = await Activity.findOne({
            where: {
                user_id: req.body.user_id,
                logout_time: null
            },
        });

        if (previousActivity) {
            var duration_in_mins = (Date.now() - previousActivity.login_time) / 60000;
            previousActivity.logout_time = Date.now();
            previousActivity.duration = duration_in_mins;
            await previousActivity.save();

            const activity = await Activity.create({
                user_id: req.body.user_id,
                ip: req.body.ip,
                login_time: Date.now()
            });
    
            res.status(201).json({
                success: true,
                message: "Previous Activity Logged and new Activity created successfully",
                data: activity,
            });

            return;
        }

        const activity = await Activity.create({
            user_id: req.body.user_id,
            ip: req.body.ip,
            login_time: Date.now()
        });

        res.status(201).json({
            success: true,
            message: "Activity created successfully",
            data: activity,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.logoutActivity = async (req, res) => {
    try {
        //give the latest activity data of a user by id
        const activity = await Activity.findOne({
            where: {
                user_id: req.body.user_id,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });

        if (!activity) {
            res.status(400).json({
                success: false,
                message: "Activity not found",
            });
            return;
        }

        // duration for the login time in minutes
        var duration_in_mins = (Date.now() - activity.login_time) / 60000;

        const result = await activity.update({
            logout_time: Date.now(),
            duration: duration_in_mins
        });

        res.status(200).json({
            success: true,
            message: "Activity updated successfully",
            data: result,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getActivityLogs = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    try {
        const activity = await Activity.findAll({
            limit: limit,
            offset: offset,
            order: [
                ['createdAt', 'DESC']
            ],
        });


        const data = [];

        if (activity.length !== 0) {
            for (var i = 0; i < activity.length; i++) {
                const user = await User.findOne({ where: { id: activity[i].user_id } });
                if (!user) {
                    res.status(400).json({
                        success: false,
                        message: "User not found",
                    });
                    return;
                }
                var map = {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    ip: activity[i].ip,
                    login_time: activity[i].login_time,
                    logout_time: activity[i].logout_time,
                    duration: activity[i].duration
                }
                data.push(map);
            }
        }

        res.status(200).json({
            success: true,
            message: "Activity found",
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const phone = req.body.phone || 0;
        const email = req.body.email || "";
        const user = await User.findOne({
            where: {
                [Op.or]: [{ phone: phone }, { email: email }]
            },
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: "User already exists",
            });
            return;
        }

        const result = await User.create({
            id: req.body.id,
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.toString(),
        });
    }
}

exports.getAllUserData = async (req, res, next) => {
    try {
        const users = await User.findAll({});

        res.status(200).json({
            success: true,
            message: "Users found",
            data: users,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.user_id
            },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getUsersBySearch = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const users = await User.findAll({
            where: {
                username: {
                    [Op.like]: '%' + req.query.search + '%'
                },
            },
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
        });

        res.status(200).json({
            success: true,
            message: "Users found",
            data: users,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.user_id
            },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const result = await user.update({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.user_id,
            },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        await Activity.destroy({
            where: {
                user_id: req.query.user_id,
            },
        });

        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

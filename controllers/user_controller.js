const User = require("../models/user");

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }

        const result = await User.create({
            email: req.body.email,
            username: req.body.username,
            ip: req.ip,
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
            error: err,
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

exports.getUserByEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.email,
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

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.email,
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
            ip: req.ip,
            email: req.body.email,
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
                email: req.params.email,
            },
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
            return;
        }

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

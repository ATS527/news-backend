const Admin = require("../models/user");
const sendToken = require("../utils/jwtToken")
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = "admin";
    const hashedPassword = bcrypt.hashSync(password, 10);

    const admin = await Admin.findOne({
        where: {
            email: email,
        },
    });

    if (admin) {
        res.status(400).json({
            success: false,
            message: "Email already exists",
        });
        return;
    }

    await Admin
        .create({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            ip: req.ip,
        })
        .then((result) => {
            sendToken(result, 201, res);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error,
            });
        });
};

exports.loginAdmin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({
        where: {
            email: email,
        },
    });

    if (!admin) {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
        return;
    }

    const isPasswordMatched = bcrypt.compareSync(password, admin.password);

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
        return;
    }

    sendToken(admin, 200, res);
};

exports.logoutAdmin = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        Credentials: true,
        sameSite: "none",
        secure: true
    });

    res.status(200).json({
        success: true,
        message: "Log out success",
    });
};


exports.changePassword = async (req, res) => {
    const { password, old_password } = req.body;

    try {
        const adminExists = await Admin.findOne({
            where: {
                 email: req.body.email,
            },
        });

        if (!adminExists) {
            res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }

        const isMatch = await bcrypt.compare(old_password, adminExists.password);

        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: "Old Password is incorrect",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.update({
            password: hashedPassword,
        }, {
            where: {
	  			email: req.body.email,
            },
        });

        sendToken(newAdmin, 201, res);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err,
        });
    }
}

exports.getCurrentlyLoggedinAdmin = async (req, res, next) => {
    const admin = await Admin.findOne({
        where: {
            id: req.user.id,
        },
    });

    if (!admin) {
        res.status(401).json({
            success: false,
            message: "User not found",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "User found",
        data: admin,
    });
}

exports.deleteAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.params.email,
            },
        });

        if (!admin) {
            res.status(400).json({
                success: false,
                message: "Admin not found",
            });
            return;
        }

        await admin.destroy();

        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
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

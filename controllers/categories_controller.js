const Categories = require("../models/categories");

exports.createCategory = async (req, res) => {
    try {
        const categories = req.body.categories;
        var result = {}
        const user_id = req.body.user_id;
        if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                const category = await Categories.findOne({
                    where: {
                        user_id: user_id,
                        category: categories[i],
                    },
                });

                if (category) {
                    res.status(200).json({
                        success: true,
                        message: "Category already exists",
                    });
                    return;
                } else {
                    for (let i = 0; i < categories.length; i++) {
                        result = await Categories.create({
                            user_id: user_id,
                            category: categories[i],
                        });
                    }
                }
            }
            res.status(201).json({
                success: true,
                message: "Category created successfully",
                data: result,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Category is empty",
            });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
}

exports.getCategoryByUserId = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            where: {
                user_id: req.query.user_id,
            },
        });

        if (!categories) {
            res.status(400).json({
                success: false,
                message: "No categories",
            });
            return;
        }

        var result = [];

        for (let i = 0; i < categories.length; i++) {
            result.push(categories[i].category);
        }

        res.status(200).json({
            success: true,
            message: "Categories found",
            user_id: req.query.user_id,
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

exports.deleteCategory = async (req, res) => {
    try {
        const categories = req.body.categories;

        if (!categories) {
            res.status(400).json({
                success: false,
                message: "No categories",
            });
            return;
        }

        for (let i = 0; i < categories.length; i++) {
            const result = await Categories.destroy({
                where: {
                    user_id: req.query.user_id,
                    category: categories[i],
                },
            });
        }

        res.status(200).json({
            success: true,
            message: "Categories deleted",
            user_id: req.query.user_id,
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
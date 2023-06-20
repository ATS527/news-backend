const Categories = require("../models/categories");

exports.createCategory = async (req, res) => {
    try {
        const categories = req.body.categories;
        var result = {}
        const email = req.body.email;
        if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                const category = await Categories.findOne({
                    where: {
                        email: email,
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
                            email: email,
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

exports.getCategoryByEmail = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            where: {
                email: req.params.email,
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
            email: req.params.email,
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
                    email: req.params.email,
                    category: categories[i],
                },
            });
        }

        res.status(200).json({
            success: true,
            message: "Categories deleted",
            email: req.body.email,
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
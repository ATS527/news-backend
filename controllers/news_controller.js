const News = require('../models/news');
const { nanoid } = require("nanoid");
const Advertisement = require("../models/news");
const Category = require("../models/categories");
const fs = require("fs");
const { Op } = require("sequelize");
const Bookmark = require('../models/bookmark');
const NewsViewed = require('../models/news_viewed');

const server_url = process.env.SERVER_URL || "http://localhost:3000/uploads/";

exports.createNews = async (req, res, next) => {
    try {
        const news = await News.findOne({
            where: {
                title: req.body.title,
            },
        });

        if (news) {
            res.status(400).json({
                success: false,
                message: "News already exists",
            });
            return;
        }

        const result = await News.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            source: req.body.source,
            link: req.body.link,
            type: "news"
        });

        res.status(201).json({
            success: true,
            message: "News created successfully",
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

exports.createNewsPicture = async (req, res, next) => {
    try {
        //upload image in the public uploads folder and provide the string path
        if (!req.files) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
            return;
        }

        const image = req.files.image;
        const filename = nanoid() + ".jpg";
        await image.mv('./public/uploads/' + filename, async err => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                    error: err,
                });
                return;
            }

            const news = await News.findByPk(req.params.id);

            if (!news) {
                res.status(400).json({
                    success: false,
                    message: "News not found",
                });
                return;
            }

            news.image = server_url + filename;

            await news.save();
            res.status(200).json({
                success: true,
                message: "News picture uploaded successfully",
                data: news,
            });
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

exports.updateNewsPicture = async (req, res, next) => {
    try {
        //upload image in the public uploads folder and provide the string path
        if (!req.files) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
            return;
        }

        const image = req.files.image;
        const filename = nanoid() + ".jpg";
        await image.mv('./public/uploads/' + filename, async err => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                    error: err,
                });
                return;
            }

            const news = await News.findByPk(req.params.id);

            if (!news) {
                res.status(400).json({
                    success: false,
                    message: "News not found",
                });
                return;
            }

            const strippedFilename = news.image.replace(server_url, "");

            await fs.unlinkSync('./public/uploads/' + strippedFilename);

            news.image = server_url + filename;

            await news.save();
            res.status(200).json({
                success: true,
                message: "News picture updated successfully",
                data: news,
            });
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


exports.getAllNews = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        // console.log();
        const offset = (page - 1) * limit;
        const news = await News.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
            where: {
                type: "news"
            }
        });

        res.status(200).json({
            success: true,
            message: "News found",
            data: news,
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

exports.getNewsBySearch = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const news = await News.findAll({
            where: {
                title: {
                    [Op.like]: '%' + req.query.search + '%'
                },
                type: "news"
            },
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
        });

        res.status(200).json({
            success: true,
            message: "News found",
            data: news,
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

exports.getNewsById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const news = await News.findByPk(id);

        if (!news) {
            res.status(400).json({
                success: false,
                message: "News not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "News found",
            data: news,
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

exports.updateNews = async (req, res, next) => {
    try {
        const id = req.params.id;

        const news = await News.findByPk(id);

        if (!news) {
            res.status(400).json({
                success: false,
                message: "News not found",
            });
            return;
        }

        const result = await news.update({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            source: req.body.source,
            link: req.body.link,
        });

        res.status(200).json({
            success: true,
            message: "News updated successfully",
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

exports.deleteNews = async (req, res, next) => {
    try {
        const id = req.params.id;

        const news = await News.findByPk(id);

        if (!news) {
            res.status(400).json({
                success: false,
                message: "News not found",
            });
            return;
        }

        await Bookmark.destroy({
            where: {
                news_id: id,
            }
        });

        await news.destroy();

        res.status(200).json({
            success: true,
            message: "News deleted successfully",
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

exports.getNewsForGuests = async (req,res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const advertisements = await Advertisement.findAll({
            where: {
                type: "advertisement",
            }
        });

        const news = await News.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
            where: {
                type: "news"
            }
        });

        //mix advertisements with news like after 5 news an ad would come
        const newsWithAdvertisement = [];
        let advertisementIndex = 0;
        for (let i = 0; i < news.length; i++) {
            if (i % 5 === 0 && i !== 0) {
                newsWithAdvertisement.push(advertisements[advertisementIndex]);
                advertisementIndex++;
            }
            newsWithAdvertisement.push(news[i]);
        }

        res.status(200).json({
            success: true,
            message: "News found",
            data: newsWithAdvertisement,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong", 
            error: err
        })
    }
}

exports.getNewsWithAdvertisementAndCategorization = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const advertisements = await Advertisement.findAll({
            where: {
                type: "advertisement",
            }
        });

        const categories = await Category.findAll({
            where: {
                email: req.query.email,
            }
        });

        const newsViewed = await NewsViewed.findAll({
            where: {
                email: req.query.email,
            }
        });

        const categorizedNews = categories.length > 0 ? await News.findAll({
            where: {
                id: {
                    [Op.notIn]: newsViewed.map(news => news.news_id),
                },
                category: {
                    [Op.or]: categories.map(category => category.category),
                }
            },
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
        }) : await News.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            offset: offset,
            limit: limit,
        });

        if (!categorizedNews) {
            res.status(400).json({
                success: false,
                message: "News not found",
            });
            return;
        }

        const newsWithAdvertisement = [];
        let advertisementIndex = 0;
        for (let i = 0; i < categorizedNews.length; i++) {
            if (i % 5 === 0 && i !== 0) {
                newsWithAdvertisement.push(advertisements[advertisementIndex]);
                advertisementIndex++;
            }
            newsWithAdvertisement.push(categorizedNews[i]);
        }

        res.status(200).json({
            success: true,
            message: "News found",
            data: newsWithAdvertisement,
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

exports.viewedNews = async (req,res) => {
    try {
        const news_id = req.query.news_id;
        const email = req.query.email;

        const news = await News.findByPk(news_id);

        if (!news) {
            res.status(400).json({
                success: false,
                message: "News not found",
            });
            return;
        }

        await NewsViewed.create({
            email: email,
            news_id: news_id,
        });

        res.status(201).json({
            success: true,
            message: "News viewed successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}
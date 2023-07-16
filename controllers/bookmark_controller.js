const Bookmark = require('../models/bookmark');
const News = require('../models/news');

exports.createBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            where: {
                user_id: req.body.user_id,
                news_id: req.body.news_id
            }
        });

        if (bookmark) {
            res.status(200).json({
                success: true,
                message: "Bookmark already exists"
            });
            return;
        }

        const result = await Bookmark.create({
            user_id: req.body.user_id,
            news_id: req.body.news_id
        });

        res.status(201).json({
            success: true,
            message: "Bookmark created successfully",
            data: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            where: {
                user_id: req.body.user_id,
                news_id: req.body.news_id
            }
        });

        if (!bookmark) {
            res.status(400).json({
                success: false,
                message: "Bookmark not found"
            });
            return;
        }

        await bookmark.destroy();

        res.status(200).json({
            success: true,
            message: "Bookmark deleted successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

exports.getBookmarkedNewsByUserId = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;
        const bookmarks = await Bookmark.findAll({
            where: {
                user_id: req.query.user_id
            },
            limit: limit,
            offset: offset,
        });

        if (!bookmarks) {
            res.status(400).json({
                success: false,
                message: "Bookmarks not found"
            });
            return;
        }

        var news = [];
        for (let i = 0; i < bookmarks.length; i++) {
            const newsItem = await News.findOne({
                where: {
                    id: bookmarks[i].news_id
                }
            });
            news.push(newsItem);
        }

        res.status(200).json({
            success: true,
            message: "Bookmarks retrieved successfully",
            data: news
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
}

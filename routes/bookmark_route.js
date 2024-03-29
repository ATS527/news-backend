const bookmarkRouter = require('express').Router();

const { createBookmark, getBookmarkedNewsByUserId, deleteBookmark } = require('../controllers/bookmark_controller');

bookmarkRouter.post('/createBookmark', createBookmark);

bookmarkRouter.get('/getBookmarkedNewsByUserId', getBookmarkedNewsByUserId);

bookmarkRouter.post('/deleteBookmark', deleteBookmark);

module.exports = bookmarkRouter;

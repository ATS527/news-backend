const bookmarkRouter = require('express').Router();

const { createBookmark, getBookmarkedNewsByEmail, deleteBookmark } = require('../controllers/bookmark_controller');

bookmarkRouter.post('/createBookmark', createBookmark);

bookmarkRouter.get('/getBookmarkedNewsByEmail', getBookmarkedNewsByEmail);

bookmarkRouter.delete('/deleteBookmark', deleteBookmark);

module.exports = bookmarkRouter;
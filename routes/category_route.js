const categoryRouter = require('express').Router();

const { createCategory, getCategoryByUserId, deleteCategory } = require('../controllers/categories_controller');

categoryRouter.post('/createCategory', createCategory);

categoryRouter.get('/getCategoryByUserId', getCategoryByUserId);

categoryRouter.delete('/deleteCategory', deleteCategory);

module.exports = categoryRouter;
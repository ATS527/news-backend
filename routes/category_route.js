const categoryRouter = require('express').Router();

const { createCategory, getCategoryByEmail, deleteCategory } = require('../controllers/categories_controller');

categoryRouter.post('/createCategory', createCategory);

categoryRouter.get('/getCategoryByEmail/:email', getCategoryByEmail);

categoryRouter.delete('/deleteCategory/:email', deleteCategory);

module.exports = categoryRouter;
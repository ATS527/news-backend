const categoryRouter = require('express').Router();

const { createCategory, getCategoryByEmailApi, deleteCategory } = require('../controllers/categories_controller');

categoryRouter.post('/createCategory', createCategory);

categoryRouter.get('/getCategoryByEmailApi', getCategoryByEmailApi);

categoryRouter.delete('/deleteCategory/:email', deleteCategory);

module.exports = categoryRouter;
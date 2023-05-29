const advertisementRouter = require('express').Router();

const { createAdvertisement, getAllAdvertisements, getAdvertisementById, updateAdvertisement, deleteAdvertisement } = require('../controllers/advertisement_controller');

const { isAuthenticatedUser } = require('../middleware/auth');

advertisementRouter.post('/createAdvertisement', isAuthenticatedUser, createAdvertisement);

advertisementRouter.get('/getAllAdvertisements', getAllAdvertisements);

advertisementRouter.get('/getAdvertisementById/:id', getAdvertisementById);

advertisementRouter.put('/updateAdvertisement/:id', isAuthenticatedUser, updateAdvertisement);

advertisementRouter.delete('/deleteAdvertisement/:id', isAuthenticatedUser, deleteAdvertisement);

module.exports = advertisementRouter;
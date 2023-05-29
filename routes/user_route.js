const userRouter = require('express').Router();

const { createUser, getUserByEmail, updateUser, deleteUser , getAllUserData } = require('../controllers/user_controller');

userRouter.post('/createUser', createUser);

userRouter.get('/getUserByEmail/:email', getUserByEmail);

userRouter.put('/updateUser/:email', updateUser);

userRouter.delete('/deleteUser/:email', deleteUser);

userRouter.get("/getAllUserData", getAllUserData);

module.exports = userRouter;
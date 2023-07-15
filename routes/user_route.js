const userRouter = require('express').Router();

const { createUser,getUsersBySearch,getActivityLogs,loginActivity,logoutActivity, getUserByEmail, updateUser, deleteUser , getAllUserData } = require('../controllers/user_controller');

userRouter.post('/createUser', createUser);

userRouter.get('/getUserByEmail', getUserByEmail);

userRouter.get('/getUsersBySearch',getUsersBySearch);

userRouter.put('/updateUser', updateUser);

userRouter.delete('/deleteUser', deleteUser);

userRouter.get("/getAllUserData", getAllUserData);

userRouter.post("/loginActivity", loginActivity);

userRouter.put("/logoutActivity", logoutActivity);

userRouter.get("/getActivityLogs", getActivityLogs);

module.exports = userRouter;
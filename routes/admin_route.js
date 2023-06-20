const adminRouter = require("express").Router();

const { createAdmin, loginAdmin, logoutAdmin,changePassword, getCurrentlyLoggedinAdmin, deleteAdmin } = require("../controllers/admin_controller");

const { isAuthenticatedUser } = require("../middleware/auth");

adminRouter.post("/createAdmin", createAdmin);

adminRouter.post("/loginAdmin", loginAdmin);

adminRouter.get("/logoutAdmin", isAuthenticatedUser, logoutAdmin);

adminRouter.put("/changePassword", isAuthenticatedUser, changePassword);

adminRouter.get("/me", isAuthenticatedUser, getCurrentlyLoggedinAdmin);

adminRouter.delete("/deleteAdmin/:email", isAuthenticatedUser, deleteAdmin);

module.exports = adminRouter;
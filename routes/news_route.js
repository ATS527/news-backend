const newsRouter = require("express").Router();

const { createNews, createNewsPicture,getNewsBySearch,getNewsWithAdvertisementAndCategorization, getAllNews, getNewsById, updateNews, deleteNews, updateNewsPicture } = require("../controllers/news_controller");

const { isAuthenticatedUser } = require("../middleware/auth");

newsRouter.post("/createNews", isAuthenticatedUser, createNews, );

newsRouter.post("/createNewsPicture/:id", isAuthenticatedUser, createNewsPicture);

newsRouter.get("/getAllNews", getAllNews);

newsRouter.get("/getNewsById/:id", getNewsById);

newsRouter.put("/updateNews/:id", isAuthenticatedUser, updateNews);

newsRouter.put("/updateNewsPicture/:id", isAuthenticatedUser, updateNewsPicture);

newsRouter.delete("/deleteNews/:id", isAuthenticatedUser, deleteNews);

newsRouter.get("/getNewsWithAdvertisementAndCategorization", getNewsWithAdvertisementAndCategorization);

newsRouter.get("/getNewsBySearch",getNewsBySearch);

module.exports = newsRouter;
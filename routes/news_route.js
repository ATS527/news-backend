const newsRouter = require("express").Router();

const { createNews, createNewsPicture,getNewsForGuests,getNewsBySearch,getNewsWithAdvertisementAndCategorization, getAllNews, getNewsById, updateNews, deleteNews, updateNewsPicture , viewedNews} = require("../controllers/news_controller");

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

newsRouter.get("/viewedNews", viewedNews);

newsRouter.get("/getNewsForGuests", getNewsForGuests);

module.exports = newsRouter;
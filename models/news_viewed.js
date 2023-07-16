const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const NewsViewed = sequelize.define("NewsViewed", {
    user_id: {
        type: Sequelize.INTEGER,
    },
    news_id: {
        type: Sequelize.INTEGER,
    }
}, {
    freezeTableName: true,
});

module.exports = NewsViewed;
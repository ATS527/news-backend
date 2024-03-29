const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const NewsViewed = sequelize.define("NewsViewed", {
    user_id: {
        type: Sequelize.STRING,
    },
    news_id: {
        type: Sequelize.INTEGER,
    }
}, {
    freezeTableName: true,
});

module.exports = NewsViewed;
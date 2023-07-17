const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const bookmark = sequelize.define("Bookmarks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    news_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});

module.exports = bookmark;
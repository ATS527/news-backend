const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const News = sequelize.define("News", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
    },
    hindi_title: {
        type: Sequelize.STRING,
    },
    hindi_description: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    source: {
        type: Sequelize.STRING,
    },
    link: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
});

module.exports = News;
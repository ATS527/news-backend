const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const categories = sequelize.define("Categories", {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true,
});

module.exports = categories;
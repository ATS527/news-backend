
const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const user = sequelize.define("Users", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
    },
    ip: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.BIGINT(10)
    },
    role: {
        type: Sequelize.STRING,
    }
}, {
    freezeTableName: true,
});

module.exports = user;
const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const activity = sequelize.define("Activity", {
    user_id: {
        type: Sequelize.STRING,
    },
    login_time: {
        type: Sequelize.DATE,
    },
    logout_time: {
        type: Sequelize.DATE,
    },
    duration: {
        type: Sequelize.BIGINT(10),
    },
    ip: {
        type: Sequelize.STRING,
    }
},
{
    freezeTableName: true,
});

module.exports = activity;
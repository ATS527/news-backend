const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const activity = sequelize.define("Activity", {
    user_id: {
        type: Sequelize.INTEGER,
    },
    login_time: {
        type: Sequelize.DATE,
    },
    logout_time: {
        type: Sequelize.DATE,
    },
    duration: {
        type: Sequelize.BIGINT(10),
    }
},
{
    freezeTableName: true,
});

module.exports = activity;
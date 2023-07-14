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
    }
},
{
    freezeTableName: true,
});

module.exports = activity;
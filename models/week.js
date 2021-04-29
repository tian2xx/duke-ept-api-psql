const Sequelize = require("sequelize");
const db = require("../config/database");

const Week = db.define("week", {
  userId: { type: Sequelize.INTEGER, required: true },
  startDay: { type: Sequelize.STRING, required: false },
});

module.exports = Week;

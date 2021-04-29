const Sequelize = require("sequelize");
const db = require("../config/database");

const Day = db.define("day", {
  weekId: { type: Sequelize.INTEGER, required: true },
  userId: { type: Sequelize.INTEGER, required: true },
  date: { type: Sequelize.STRING, required: false },
  dateName: { type: Sequelize.STRING, required: false },
});

module.exports = Day;

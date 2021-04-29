const Sequelize = require("sequelize");
const db = require("../config/database");

const Activities = db.define("activities", {
  dayId: { type: Sequelize.INTEGER, required: true },
  userId: { type: Sequelize.INTEGER, required: true },
  activityId: { type: Sequelize.INTEGER, required: false },
  categoryId: { type: Sequelize.INTEGER, required: false },
  difficultyId: { type: Sequelize.INTEGER, required: false },
  mET: { type: Sequelize.INTEGER, required: false },
  activityName: { type: Sequelize.STRING, required: false },
  hasCompleted: { type: Sequelize.INTEGER, required: false },
  exertion: { type: Sequelize.INTEGER, required: false },
});

module.exports = Activities;

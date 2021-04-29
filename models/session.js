const Sequelize = require("sequelize");
const db = require("../config/database");

const Session = db.define("session", {
  userId: { type: Sequelize.INTEGER, required: true },
  token: { type: Sequelize.STRING, required: true },
  device: { type: Sequelize.STRING, required: false },
  clientIp: { type: Sequelize.STRING, required: false },
});

module.exports = Session;

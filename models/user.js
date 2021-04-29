const Sequelize = require("sequelize");
const db = require("../config/database");

("use strict");

const User = db.define("user", {
  fullName: { type: Sequelize.STRING, required: false },
  email: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false,
    unique: true,
    // validate: {
    //   isEmail: {
    //     msg: "Must be a valid email address",
    //   },
    // },
  },
  password: { type: Sequelize.STRING, required: true },
  birthday: { type: Sequelize.STRING, required: false },
  gender: { type: Sequelize.STRING, required: false },
  role: { type: Sequelize.STRING, required: true },

  accessToken: { type: Sequelize.STRING, required: false },
});

module.exports = User;

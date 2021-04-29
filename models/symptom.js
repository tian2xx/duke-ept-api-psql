const Sequelize = require("sequelize");
const db = require("../config/database");

const Symptom = db.define("symptom", {
  userId: { type: Sequelize.INTEGER, required: true },
  startDay: { type: Sequelize.STRING, required: true },
  pain: { type: Sequelize.STRING, required: false },
  fatigue: { type: Sequelize.STRING, required: false },
  nausea: { type: Sequelize.STRING, required: false },
  disturbedSleep: { type: Sequelize.STRING, required: false },
  anxiety: { type: Sequelize.STRING, required: false },
  shortnessOfBreath: { type: Sequelize.STRING, required: false },
  cantRememberThings: { type: Sequelize.STRING, required: false },
  lackOfAppetite: { type: Sequelize.STRING, required: false },
  drowsy: { type: Sequelize.STRING, required: false },
  sadness: { type: Sequelize.STRING, required: false },
  vomit: { type: Sequelize.STRING, required: false },
  numbnessOrTingling: { type: Sequelize.STRING, required: false },
  generalActivity: { type: Sequelize.STRING, required: false },
  mood: { type: Sequelize.STRING, required: false },
  work: { type: Sequelize.STRING, required: false },
  relationWithOthers: { type: Sequelize.STRING, required: false },
  walking: { type: Sequelize.STRING, required: false },
  enjoymentOfLife: { type: Sequelize.STRING, required: false },
  difficultyLevel: { type: Sequelize.STRING, required: false },
});

module.exports = Symptom;

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Week = require("../models/week");
const Day = require("../models/day");
const Activities = require("../models/activities");

// // // // START OF KNEX
// // // const knex = require("knex");
// // // const config = require("../config/knexfile");
// // // const knexDB = knex(config.development);
// // // // END OF KNEX

router
  .get("/users", async (req, res) => {
    await User.findAll({ where: { role: "USER" } })
      .then(async (users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json([]);
      });
  })
  .get("/users/:userId", async (req, res) => {
    const { userId } = req.params;

    await Week.findAll({
      where: { userId: userId },
      attributes: ["id", "startDay"],
    })
      .then((week) => {
        res.status(200).json(week);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .get("/users/:userId/weekId/:weekId", async (req, res) => {
    const { userId, weekId } = req.params;

    await Day.findAll({
      where: { userId: userId, weekId: weekId },
      // attributes: ["id", "startDay"],
    })
      .then((days) => {
        res.status(200).json(days);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .get("/users/:userId/dayId/:dayId", async (req, res) => {
    const { userId, weekId, dayId } = req.params;

    await Activities.findAll({
      where: {
        userId: userId,
        dayId: dayId,
      },
      // attributes: ["id", "startDay"],
    })
      .then((activity) => {
        res.status(200).json(activity);
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;

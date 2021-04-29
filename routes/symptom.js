const express = require("express");
const router = express.Router();
const Symptom = require("../models/symptom");
const Week = require("../models/week");

router
  .post("/", async (req, res) => {
    const {
      userId,
      startDay,
      pain,
      fatigue,
      nausea,
      disturbedSleep,
      anxiety,
      shortnessOfBreath,
      cantRememberThings,
      lackOfAppetite,
      drowsy,
      sadness,
      vomit,
      numbnessOrTingling,
      generalActivity,
      mood,
      work,
      relationWithOthers,
      walking,
      enjoymentOfLife,
      difficultyLevel,
    } = req.body;

    const newSymptom = {
      userId,
      startDay,
      pain,
      fatigue,
      nausea,
      disturbedSleep,
      anxiety,
      shortnessOfBreath,
      cantRememberThings,
      lackOfAppetite,
      drowsy,
      sadness,
      vomit,
      numbnessOrTingling,
      generalActivity,
      mood,
      work,
      relationWithOthers,
      walking,
      enjoymentOfLife,
      difficultyLevel,
    };

    Symptom.create(newSymptom)
      .then((symptom) => {
        res.status(201).json(symptom);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({});
      });
  })
  .post("/checkWeek", async (req, res) => {
    const { userId, startDay } = req.body;

    let hasWeekData = undefined;

    await Week.findOne({
      where: { startDay: startDay, userId: userId },
    })
      .then((item) => {
        hasWeekData = item;
      })
      .catch((err) => console.log("SYMPTOM ISSUE : ", err));

    if (hasWeekData) {
      await Symptom.findAll({ where: { userId: userId, startDay: startDay } })
        .then((week) => {
          console.log("HAS DATA ? ", week);
          if (week) {
            console.log("HAS DATA");
            res.status(200).json(week);
          } else {
            res.status(200).json([]);
          }
        })
        .catch((err) => {
          res.status(201).json([]);
        });
    } else {
      console.log("DOES NOT HAVE DATA");
      const errorMessage = {
        error: "Please add activity plans to log symptoms.",
      };
      res.status(200).json(errorMessage);
    }

    console.log({ userId, startDay });
  })
  .post("/get", async (req, res) => {
    // .post(`/symptoms/users/${userId}/weeks/${weekId}`, {
    const { userId, startDay } = req.body;

    console.log({ userId, startDay });
    await Symptom.findOne({ where: { userId: userId, startDay: startDay } })
      .then(async (symptoms) => {
        const data = {
          id: symptoms.id,
          userId: symptoms.userId,
          startDay: symptoms.startDay,
          createdAt: symptoms.createdAt,
          updatedAt: symptoms.updatedAt,
          symptoms: {
            pain: symptoms.pain,
            fatigue: symptoms.fatigue,
            nausea: symptoms.nausea,
            disturbedSleep: symptoms.disturbedSleep,
            anxiety: symptoms.anxiety,
            shortnessOfBreath: symptoms.shortnessOfBreath,
            cantRememberThings: symptoms.cantRememberThings,
            lackOfAppetite: symptoms.lackOfAppetite,
            drowsy: symptoms.drowsy,
            sadness: symptoms.sadness,
            vomit: symptoms.vomit,
            numbnessOrTingling: symptoms.numbnessOrTingling,
          },
          activities: {
            generalActivity: symptoms.generalActivity,
            mood: symptoms.mood,
            work: symptoms.work,
            relationWithOthers: symptoms.relationWithOthers,
            walking: symptoms.walking,
            enjoymentOfLife: symptoms.enjoymentOfLife,
          },
          exercise: {
            difficultyLevel: symptoms.difficultyLevel,
          },
        };

        // What are your symptoms?

        // Have your symptoms interfered with your activities?

        // What do you think about the exercise plan in the last week?

        res.status(200).json(data);
        // res
        //   .status(200)
        //   .json(addToObject(day.dataValues, "activities", activities));
      })
      .catch((err) => {
        res.status(404).json([]);
      });
  });

// .put("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!req.user || req.user.id != id) {
//     res.status(401);

//     console.log("ERROR UNAuthorized user", req.user.id, id);
//     return;
//   }

//   User.update(
//     {
//       ...req.body,
//     },
//     { where: { id } }
//   )
//     .then((user) => {
//       res.status(201).json(user);
//     })
//     .catch((err) => {
//       res.status(401).send(err);
//     });
// });

module.exports = router;

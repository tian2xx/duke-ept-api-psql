const express = require("express");
const router = express.Router();
const Activities = require("../models/activities");
const Day = require("../models/day");
const Week = require("../models/week");

// START OF KNEX
const knex = require("knex");
const config = require("../config/knexfile");
const knexDB = knex(config.development);
// END OF KNEX

const getDayOfWeek = (e, add) => {
  let d = new Date(e);
  var day = d.getDay(),
    diff = d.getDate() + add; // adjust when day is sunday

  return new Date(d.setDate(diff));
};
const formattedDay = (d) => {
  let date = new Date(d);

  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
};
const addToObject = (obj, key, value, index) => {
  var temp = {};
  var i = 0;

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (i === index && key && value) {
        temp[key] = value;
      }
      temp[prop] = obj[prop];
      i++;
    }
  }

  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;
};

router
  .get("/", async (req, res) => {
    const { id } = req.user;
    let activity = [];

    if (id) {
      Activities.findAll({ where: { userId: id } })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log("Activities findAll Error :", err);
        });
    }
  })
  .post("/add", async (req, res) => {
    const {
      userId,
      startDay,
      rowStartDay,

      mondayActivities,
      tuesdayActivities,
      wednesdayActivities,
      thursdayActivities,
      fridayActivities,
      saturdayActivities,
      sundayActivities,
    } = req.body;

    await Week.create({ userId: userId, startDay: startDay })
      .then(async (week) => {
        console.log(
          "=====>>>>> ",
          formattedDay(getDayOfWeek(rowStartDay, 0)),
          startDay
        );
        if (week.id) {
          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Monday",
            date: formattedDay(getDayOfWeek(rowStartDay, 0)),
          })
            .then((day) => {
              if (mondayActivities.length > 0) {
                let objs = [];
                mondayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });

                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Monday is Done!");
                  })
                  .catch((err) => {
                    console.log("Monday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Tuesday",
            date: formattedDay(getDayOfWeek(rowStartDay, 1)),
          })
            .then((day) => {
              if (tuesdayActivities.length > 0) {
                let objs = [];
                tuesdayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });

                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Tuesday is Done!");
                  })
                  .catch((err) => {
                    console.log("Tuesday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Wednesday",
            date: formattedDay(getDayOfWeek(rowStartDay, 2)),
          })
            .then((day) => {
              if (wednesdayActivities.length > 0) {
                let objs = [];
                wednesdayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });
                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Wednesday is Done!");
                  })
                  .catch((err) => {
                    console.log("Wednesday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Thursday",
            date: formattedDay(getDayOfWeek(rowStartDay, 3)),
          })
            .then((day) => {
              if (thursdayActivities.length > 0) {
                let objs = [];
                thursdayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });
                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Thursday is Done!");
                  })
                  .catch((err) => {
                    console.log("Thursday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Friday",
            date: formattedDay(getDayOfWeek(rowStartDay, 4)),
          })
            .then((day) => {
              if (fridayActivities.length > 0) {
                let objs = [];
                fridayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });
                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Friday is Done!");
                  })
                  .catch((err) => {
                    console.log("Friday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Saturday",
            date: formattedDay(getDayOfWeek(rowStartDay, 5)),
          })
            .then((day) => {
              if (saturdayActivities.length > 0) {
                let objs = [];
                saturdayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });
                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Saturday is Done!");
                  })
                  .catch((err) => {
                    console.log("Saturday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          await Day.create({
            weekId: week.id,
            userId: userId,
            dateName: "Sunday",
            date: formattedDay(getDayOfWeek(rowStartDay, 6)),
          })
            .then((day) => {
              if (sundayActivities.length > 0) {
                let objs = [];
                sundayActivities?.map((activity) => {
                  objs.push({
                    dayId: day.id,
                    userId: userId,
                    activityId: activity.id,
                    categoryId: activity.categoryId,
                    difficultyId: activity.difficultyId,
                    mET: activity.mET || activity.MET,
                    activityName: activity.value,
                  });
                });
                Activities.bulkCreate([...objs])
                  .then((activity) => {
                    console.log("Sunday is Done!");
                  })
                  .catch((err) => {
                    console.log("Sunday ERROR !", err);
                  });
              }
            })
            .catch((err) => {
              res.status(401);
              console.log("DATE_ERR: ", err);
            });

          res.status(201).json([]);
        }
      })
      .catch((err) => {
        res.status(201).json(err);
      });
  })
  .post("/update", async (req, res) => {
    const { activities, userId } = req.body;
    await activities?.map(async (activity) => {
      await Activities.update(
        { hasCompleted: activity?.hasCompleted, exertion: activity.exertion },
        { where: { id: activity.id, userId: userId } }
      )
        .then((e) => {
          console.log("Activity: ", e);
        })
        .catch((err) => console.log("error: ", err));
    });
    res.status(200).json([]);
  })
  .post("/checkWeek", async (req, res) => {
    const { userId, startDay } = req.body;
    await Week.findOne({ where: { userId: userId, startDay: startDay } })
      .then((week) => {
        if (week) {
          console.log(week);
          res.status(200).json(week);
        } else {
          res.status(200).json([]);
        }
      })
      .catch((err) => {
        res.status(201).json([]);
      });

    console.log({ userId, startDay });
  })
  .post("/get", async (req, res) => {
    const { userId, date } = req.body;
    console.log({ userId, date });
    await Day.findOne({ where: { userId: userId, date: date } })
      .then(async (day) => {
        await Activities.findAll({ where: { userId: userId, dayId: day.id } })
          .then((activities) => {
            res
              .status(200)
              .json(addToObject(day.dataValues, "activities", activities));
          })
          .catch((err) => {
            console.log("Can not find activities :", err);
            res.status(401).json([]);
          });
      })
      .catch((err) => {
        res.status(404).json([]);
      });
  })
  .post("/summary", async (req, res) => {
    const { userId, startDay, month } = req.body;

    if (startDay === "0") {
      console.log("****************************", startDay,"*******************")
      knexDB("weeks")
        .innerJoin("days", "weeks.id", "=", "days.weekId")
        .innerJoin("activities", "days.id", "=", "activities.dayId")
        .where("weeks.userId", userId)
        // .where("activities?.hasCompleted", "IS NOT", null)
        .options({ nestTables: true })
        .select("weeks.*", "days.*", "activities.*")
        .then((data) => {
          // console.log(data);
          // let week;
          // let days = [];
          // let activities = [];
          // console.log("startDay : =====> ", startDay);

          // data.map((d, i) => {
          //   console.log(
          //     "===== > ",
          //     startDay,
          //     month,
          //     d?.days?.date?.substring(0, 2) === month
          //   );
          //   if (d?.days?.date.substring(0, 2) === month) {
          //     week = d.weeks;
          //     days.push(d.days);

          //     if (d.activities?.hasCompleted === 0) {
          //       activities.push({ ...d.activities, mET: 0 });
          //     } else {
          //       activities.push(d.activities);
          //     }
          //   }
          // });

          // console.log(" ===============> ",days, " ================= ");
          let newDays = [
            ...new Map(data.map((item) => [item["id"], item])).values(),
          ];

          res.status(200).json(newDays);
          // res.status(200).json({ week, days: newDays, activities });
        })
        .catch((err) => console.log("err : ", err));
    } else {
      knexDB("weeks")
        .innerJoin("days", "weeks.id", "=", "days.weekId")
        .innerJoin("activities", "days.id", "=", "activities.dayId")
        .where("weeks.userId", userId)
        .where("weeks.startDay", startDay)
        .where("activities.hasCompleted", "IS NOT", null)
        // .options({ nestTables: true })
        .select("weeks.*", "days.*", "activities.*")
        .then((data) => {
          // console.log("No Months", userId, startDay, month, data);

          let week;
          let days = [];
          let activities = [];

          // data.map((d, i) => {
          //   week = d.weeks;
          //   days.push(d.days);

          //   if (d.activities?.hasCompleted === 0) {
          //     activities.push({ ...d.activities, mET: 0 });
          //   } else {
          //     activities.push(d.activities);
          //   }
          // });

          // console.log(" ===============> ",data, " ================= ");
          let newDays = [
            ...new Map(data.map((item) => [item["id"], item])).values(),
          ];
          console.log(" ===============> ",newDays, " =================>");
          
          res.status(200).json(newDays);
          // res.status(200).json({ week, days: days, activities });
        })
        .catch((err) => console.log("err : ", err));
    }
  })
  .post("/getActivityDays", async (req, res) => {
    const { userId, weekId } = req.body;

    await Day.findAll({ where: { userId: userId, weekId: weekId } })
      .then((days) => {
        res.status(201).json(days);
      })
      .catch((err) => {
        res.status(403).json([]);
      });
  })
  .post("/addMore", async (req, res) => {
    const {
      userId,

      sundayId,
      mondayId,
      tuesdayId,
      wednesdayId,
      thursdayId,
      fridayId,
      saturdayId,

      sundayActivities,
      mondayActivities,
      tuesdayActivities,
      wednesdayActivities,
      thursdayActivities,
      fridayActivities,
      saturdayActivities,
    } = req.body;

    if (sundayActivities.length > 0) {
      let objs = [];
      sundayActivities?.map((activity) => {
        objs.push({
          dayId: sundayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("sunday is Done!");
        })
        .catch((err) => {
          console.log("sunday ERROR !", err);
        });
    }

    if (mondayActivities.length > 0) {
      let objs = [];
      mondayActivities?.map((activity) => {
        objs.push({
          dayId: mondayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("monday is Done!");
        })
        .catch((err) => {
          console.log("monday ERROR !", err);
        });
    }

    if (tuesdayActivities.length > 0) {
      let objs = [];
      tuesdayActivities?.map((activity) => {
        objs.push({
          dayId: tuesdayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("tuesday is Done!");
        })
        .catch((err) => {
          console.log("tuesday ERROR !", err);
        });
    }

    if (wednesdayActivities.length > 0) {
      let objs = [];
      wednesdayActivities?.map((activity) => {
        objs.push({
          dayId: wednesdayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("wednesday is Done!");
        })
        .catch((err) => {
          console.log("wednesday ERROR !", err);
        });
    }

    if (thursdayActivities.length > 0) {
      let objs = [];
      thursdayActivities?.map((activity) => {
        objs.push({
          dayId: thursdayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("thursday is Done!");
        })
        .catch((err) => {
          console.log("thursday ERROR !", err);
        });
    }

    if (fridayActivities.length > 0) {
      let objs = [];
      fridayActivities?.map((activity) => {
        objs.push({
          dayId: fridayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("friday is Done!");
        })
        .catch((err) => {
          console.log("friday ERROR !", err);
        });
    }

    if (saturdayActivities.length > 0) {
      let objs = [];
      saturdayActivities?.map((activity) => {
        objs.push({
          dayId: saturdayId,
          userId: userId,
          activityId: activity.id,
          categoryId: activity.categoryId,
          difficultyId: activity.difficultyId,
          mET: activity.mET || activity.MET,
          activityName: activity.value,
        });
      });
      Activities.bulkCreate([...objs])
        .then((activity) => {
          console.log("saturday is Done!");
        })
        .catch((err) => {
          console.log("saturday ERROR !", err);
        });
    }

    const dassaddsa = {
      status: "Done",
    };
    res.status(201).json(dassaddsa);
  });

module.exports = router;

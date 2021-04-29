const express = require("express");
const Activities = require("../models/activities");
const Day = require("../models/day");
const Symptom = require("../models/symptom");
const router = express.Router();
const User = require("../models/user");
const Week = require("../models/week");
const bcrypt = require("bcryptjs-then");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

router
  .get("/", (req, res) => {
    User.findAll()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((error) => {
        res.status(401);
      });
  })
  .get("/:id", async (req, res) => {
    res.status(200).json(req.user);
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;

    if (!req.user || req.user.id != id) {
      res.status(401);

      console.log("ERROR UNAuthorized user", req.user.id, id);
      return;
    }

    User.update(
      {
        ...req.body,
      },
      { where: { id } }
    )
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    User.destroy({ where: { id: id } })
      .then(async (user) => {
        await Week.destroy({ where: { userId: id } });
        await Symptom.destroy({ where: { userId: id } });
        await Day.destroy({ where: { userId: id } });
        await Activities.destroy({ where: { userId: id } });

        res.status(201).send([]);
      })
      .catch((error) => res.status(401));
    console.log("DELETE");
  })
  .post("/changePassword", async (req, res) => {
    const { password, userId } = req.body;
    const hashedPassword = await hashPassword(password);

    console.log("--------->");
    console.log({ password, userId });

    await User.update(
      {
        password: hashedPassword,
      },
      { where: { id: userId } }
    )
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  });
module.exports = router;

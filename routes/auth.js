const express = require("express");
const router = express.Router();
// const db = require("../config/database");
const User = require("../models/user");
const Session = require("../models/session");
const bcrypt = require("bcryptjs-then");
const jwt = require("jsonwebtoken");
const Activities = require("../models/activities");
const Day = require("../models/day");
const Symptom = require("../models/symptom");
const Week = require("../models/week");

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
const getClientIp = (req) =>
  req.headers["x-forwarded-for"] || req.connection.remoteAddress;

// Get All users
router
  .get("/", (req, res) => {
    User.findAll()
      .then((user) => {
        console.log("USers : ",user)
        res.json(user);
        res.sendStatus(200);
      })
      .catch((err) => console.log("err : ", err));
  })
  .post("/login", async (req, res, next) => {
    try {
      console.log(" ======> ", req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      // if (!user) return next(new Error("Email does not exist"));
      if (!user) {
        // res.status(204);
        res.status(200).json({
          status: 204,
          // error: "Email does not exist",
          error: "Couldn't find your account",
        });

        // return next(new Error("Email does not exist"));
      } else {
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) {
          res.status(203).json({
            status: 203,
            // error: "Password is not correct",
            error: "Wrong password. Try again or contact support to reset it.",
          });

          // return next(new Error("Password is not correct"));
        } else {
          const accessToken = jwt.sign(
            { userId: user.id },
            // process.env.JWT_SECRET,
            "jpH6wkETaVQAw8KL",
            {
              expiresIn: "30 days",
            }
          );

          await user
            .update({ accessToken: accessToken })
            .then((result) => {
              console.log("update succesfully");
              // res.status(201).json(user);
            })
            .catch((err) => {
              console.log("update falid");
              res.status(501);
            });

          // log user login
          await Session.create({
            userId: user.id,
            token: accessToken,
            device: req.device.type.toUpperCase(),
            clientIp: getClientIp(req),
          });

          await res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            // avatar: user.avatar,
            email: user.email,
            accessToken,
            validPassword,
          });
        }
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  })
  .post("/signup", async (req, res, next) => {
    try {
      const { fullName, email, password, role } = req.body;
      const hashedPassword = await hashPassword(password);

      const checkUser = await User.findOne({ where: { email } });

      if (checkUser) {
        res.status(200).json({
          status: 204,
          // error: "Email does not exist",
          error: "Email already exist. Please try another email.",
        });
      } else {
        let newUser = {
          // id: "ads21312dsa",
          fullName,
          email,
          password: hashedPassword,
          role,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const accessToken = jwt.sign(
          { userId: newUser.id },
          "jpH6wkETaVQAw8KL",
          {
            expiresIn: "1d",
          }
        );

        newUser = {
          ...newUser,
          accessToken,
        };

        User.create(newUser)
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({});
          });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post("/users", async (req, res, next) => {
    User.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res.status(401);
    });
  })
  .post("/activities", async (req, res, next) => {
    Activities.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res.status(401);
    });
  })
  .post("/day", async (req, res, next) => {
    Day.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res.status(401);
    });
  })
  .post("/symptom", async (req, res, next) => {
    Symptom.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res.status(401);
    });
  })
  .post("/week", async (req, res, next) => {
    Week.findAll()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      res.status(401);
    });
  })
  .post("/removeAll", async (req, res, next) => {
    User.destroy({
      where: {},
      truncate: true
    })
    Session.destroy({
      where: {},
      truncate: true
    })
    Activities.destroy({
      where: {},
      truncate: true
    })
    Day.destroy({
      where: {},
      truncate: true
    })
    Symptom.destroy({
      where: {},
      truncate: true
    })
    Week.destroy({
      where: {},
      truncate: true
    })
    res.status(200)
  })


module.exports = router;

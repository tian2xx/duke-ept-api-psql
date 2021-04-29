const express = require("express");

const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const activities = require("./activities");
const admin = require("./admin");
const symptom = require("./symptom");

const allowIfLogin = require("../middlewares/allowIfLogin");

router.use("/auth", auth);
router.use("/user", allowIfLogin, user);
// router.use("/activities", allowIfLogin, activities);
router.use("/activities", activities);
router.use("/admin", allowIfLogin, admin);
router.use("/symptoms", allowIfLogin, symptom);
// router.use("/users", allowIfLogin, customer);

module.exports = router;

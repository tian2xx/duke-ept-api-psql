const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function allowIfLogin(req, res, next) {
  const clientIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      const { userId, exp } = await jwt.verify(token, "jpH6wkETaVQAw8KL");

      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      req.user = await User.findOne({ where: { id: userId } });
      req.clientIp = clientIp;
      next();
    } catch (err) {
      console.log("catch Error : ", err);
      return res.status(401).json({
        error: "Invalid JWT token",
      });
    }
  } else {
    next();
  }
}

module.exports = allowIfLogin;

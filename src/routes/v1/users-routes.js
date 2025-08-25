const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");
const { rateLimiter, extractUserFromRefreshToken } = require("../../middlewares");
const loginValidator = require("../../middlewares/login-middleware");
const { query } = require("express-validator");

router.post("/register", UserController.registerUser);

router.post(
  "/login",
  rateLimiter.loginRateLimiter(5, 15 * 60 * 1000),
  loginValidator,
  UserController.login
);

router.post("/logout", extractUserFromRefreshToken ,UserController.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { UserController  } = require("../../controllers");
const { rateLimiter } = require("../../middlewares");
const { query } = require("express-validator");

router.post("/register", UserController.registerUser);



module.exports = router;
const express = require("express");
const router = express.Router();
const { usersRegister } = require("../../controllers");
const { rateLimiter } = require("../../middlewares");
const { query } = require("express-validator");

router.post("/register", usersRegister.userRegister);



module.exports = router;
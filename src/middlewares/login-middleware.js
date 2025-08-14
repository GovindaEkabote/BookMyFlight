const { body } = require("express-validator");
const { User } = require("../models");
const ApiError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new ApiError("User not found", StatusCodes.NOT_FOUND);
      }

      if (!user.isVerified) {
        throw new ApiError("Please verify your email first", StatusCodes.FORBIDDEN);
      }

      if (user.isLocked) {
        throw new ApiError("Account temporarily locked. Try again later", StatusCodes.FORBIDDEN);
      }

      return true; // ✅ must return something in async custom validators
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

module.exports = loginValidator;

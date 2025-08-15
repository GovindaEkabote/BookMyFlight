const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/common");
const { User } = require("../models");

module.exports = async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return ErrorResponse.unauthorized(res, "Authorization token missing");
    }
    const token = authHeader.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user from DB
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return ErrorResponse.unauthorized(res, "User not found");
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return ErrorResponse.unauthorized(res, "Token expired");
    }
    if (err.name === "JsonWebTokenError") {
      return ErrorResponse.unauthorized(res, "Invalid token");
    }
    next(err);
  }
};

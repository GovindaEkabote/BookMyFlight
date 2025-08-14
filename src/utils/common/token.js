// utils/common/token.js
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/app-error");
const config = require("../../config/server.config");
const { StatusCodes } = require("http-status-codes");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    config.JWT_ACCESS_SECRET,
    { expiresIn: config.JWT_ACCESS_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    config.JWT_REFRESH_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRATION }
  );

  return { accessToken, refreshToken };
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new ApiError("Invalid Token", StatusCodes.UNAUTHORIZED);
  }
};

const decodeToken = (token, secret) => {
  try {
    return jwt.decode(token, secret);
  } catch (error) {
    throw new ApiError("Invalid Token", StatusCodes.UNAUTHORIZED);
  }
};

module.exports = {
  generateTokens,
  setRefreshTokenCookie, // ✅ now exported
  verifyToken,
  decodeToken
};

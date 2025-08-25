const jwt = require("jsonwebtoken");
const { serverConfig } = require("../config");

async function extractUserFromRefreshToken(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      req.userId = null;
      return next();
    }

    try {
      const decoded = jwt.verify(refreshToken, serverConfig.JWT_REFRESH_SECRET);
      req.userId = decoded.id;
    } catch (error) {
      console.warn("Invalid/expired refresh token in middleware:", error.message);
      req.userId = null;
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = extractUserFromRefreshToken;

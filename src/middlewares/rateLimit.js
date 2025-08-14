const { rateLimit } = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");
const ApiError = require('../utils/errors/app-error');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 requests per windowMs
  message: {
    success: false,
    message: "Too many search requests, please try again later",
    error: {
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      explanation: "Rate limit exceeded",
    },
  },
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
});

const loginRateLimiter = (maxAttempts, windowMs) =>{
  return rateLimit({
    windowMs,
    max:maxAttempts,
    handler:(req,res) =>{
      throw new ApiError('Too many login attempts. Please try again later.',StatusCodes.TOO_MANY_REQUESTS)
    },
    keyGenerator:(req) =>{
      return req.ip;
    }
  })
}

module.exports = {limiter,loginRateLimiter};

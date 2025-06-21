const { StatusCodes } = require("http-status-codes");
const {ErrorResponse} = require('../utils/common')

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong while registering airplane";
    ErrorResponse.error = {
        explanation:
          "Model Number not found in the incomming request in the correct",
      }
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports ={
    validateCreateRequest
}

// modelNumber, capacity, companyName, country

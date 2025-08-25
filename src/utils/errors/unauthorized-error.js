const { StatusCodes } = require('http-status-codes');

class UnauthorizedErrorResponse {
  static unauthorized(res, message = 'Unauthorized') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message,
      data: {},
      error: {
        code: StatusCodes.UNAUTHORIZED,
        description: message
      }
    });
  }

  static badRequest(res, message = 'Bad request') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message,
      data: {},
      error: {
        code: StatusCodes.BAD_REQUEST,
        description: message
      }
    });
  }

  static notFound(res, message = 'Not found') {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message,
      data: {},
      error: {
        code: StatusCodes.NOT_FOUND,
        description: message
      }
    });
  }

  static internal(res, message = 'Internal server error') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
      data: {},
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        description: message
      }
    });
  }
}

module.exports = UnauthorizedErrorResponse;

class ApiResponse {
  static success(res, { message = 'Success', data = null, statusCode = 200 }) {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
      success: false,
      message,
      errors: error.errors
    });
  }
}

module.exports = ApiResponse;
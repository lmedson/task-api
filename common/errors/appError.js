const ErrorCodes = require('./errorCodes');

class AppError extends Error {
  constructor(errorCode, customMessage, customCode) {
    const { message, code, statusCode } = ErrorCodes[errorCode] || {};
    super(customMessage || message);
    this.statusCode = customCode || statusCode;
    Error.captureStackTrace(this);
  }
}

module.exports = AppError;

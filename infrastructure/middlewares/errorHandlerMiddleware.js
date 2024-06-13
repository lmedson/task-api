const { ErrorCodes } = require('../../common/errors/errorCodes');
const AppError = require('../../common/errors/appError');
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      code: err.code,
      message: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = errorHandler;
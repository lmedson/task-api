const http = require('http');

const iota = (() => {
  let count = 0;
  return () => ++count;
})();

const errorIota = {
  TASK_NOT_FOUND_CODE: iota()
};

const ErrorCodes = {
  TASK_NOT_FOUND_CODE: {
    code: errorIota.TASK_NOT_FOUND_CODE,
    message: 'Task not found',
    statusCode: 404
  }
};

module.exports = ErrorCodes;

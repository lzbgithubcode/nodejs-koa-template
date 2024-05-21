/**
 *  返回成功
 */
const successResponse = (code = 0, success = true, message = '成功', data = null) => {
  return {
    statusCode: 200,
    code: code,
    success: code != 0 ? false : success,
    message,
    data
  };
};

/**
 * 返回失败
 */
const failResponse = (code = 500, message = 'fail') => {
  return {
    statusCode: code,
    code,
    success: false,
    message,
    data: null
  };
};

module.exports = {
  successResponse,
  failResponse
};

/**
 *  返回成功
 */
const successResponse = (data = null, message = 'success') => {
  return {
    code: 200,
    success: true,
    message,
    data
  };
};

/**
 * 返回失败
 */
const failResponse = (code = 500, message = 'fail') => {
  return {
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

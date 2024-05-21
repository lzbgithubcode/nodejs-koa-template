const { successResponse, failResponse } = require('../utils/response.js');
const { errorLogger } = require('../utils/logger.js');

module.exports = async (ctx, next) => {
  try {
    // 等待其他中间件处理请求
    await next();

    // 如果响应体不存在或已经发送，则不进行处理
    if (!ctx.body || ctx.headerSent) {
      return;
    }

    // 设置默认的响应状态码和消息
    const { code, message, data } = ctx.body;
    const success = code == undefined || code == null || code == 0;
    ctx.body = successResponse(code, success, message, data);
  } catch (error) {
    errorLogger.error('服务器响应异常----', error);
    // 处理错误并设置响应体
    ctx.status = error.statusCode || 500;
    ctx.body = failResponse(ctx.status, error.message);
  }
};

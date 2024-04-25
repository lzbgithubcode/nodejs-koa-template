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
    if (ctx.body && ctx.body.success != undefined) {
      // 如果ctx.body已经包含了success属性，说明它已经被处理过了，直接返回
      ctx.body = {
        code: ctx.status === 200 ? 200 : ctx.status,
        success: ctx.body.success,
        message: ctx.body.message || 'Success',
        data: ctx.body.data
      };
    } else {
      // 否则，使用默认的成功响应
      ctx.body = successResponse(ctx.body);
    }
  } catch (error) {
    errorLogger.error('服务器响应异常----', error);
    // 处理错误并设置响应体
    ctx.status = error.statusCode || 500;
    ctx.body = failResponse(ctx.status, error.message);
  }
};

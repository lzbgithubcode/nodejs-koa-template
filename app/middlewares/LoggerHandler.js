const { globalLogger, infoLogger, errorLogger } = require('../utils/logger.js');
const LoggerHandler = async (ctx, next) => {
  // 获取开始时间
  // console.log('A-----经过---LoggerHandler--中间件');
  if (!ctx.globalLogger) ctx.globalLogger = globalLogger;
  if (!ctx.errorLogger) ctx.errorLogger = errorLogger;
  if (!ctx.infoLogger) ctx.infoLogger = infoLogger;
  await next();
  // console.log('B-----经过---LoggerHandler--中间件');
};

module.exports = LoggerHandler;

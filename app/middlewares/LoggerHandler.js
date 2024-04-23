const { globalLogger, infoLogger, errorLogger } = require('../utils/logger.js');
const LoggerHandler = async (ctx, next) => {
  // 获取开始时间
  console.log('A-----经过---LoggerHandler--中间件');
  if (!ctx.globalLogger) ctx.globalLogger = globalLogger;
  if (!ctx.errorLogger) ctx.errorLogger = errorLogger;
  if (!ctx.infoLogger) ctx.infoLogger = infoLogger;
  globalLogger.error('globalLogger额手机哦是打发的撒');
  errorLogger.error('我是errorLogger信息');
  infoLogger.info('我是infoLogger信息');
  await next();
  console.log('B-----经过---LoggerHandler--中间件');
};

module.exports = LoggerHandler;

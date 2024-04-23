const log4js = require('log4js');
const path = require('path');

const config = {
  appenders: {
    // 控制台输出
    console: {
      type: 'console',
      layout: {
        type: 'colored'
      }
    },

    // 错误日志输出到文件
    errorFile: {
      type: 'dateFile', // 设置类型为 dateFile
      filename: path.join(__dirname, '../../logs/error'),
      encoding: 'utf-8', // 指定编码格式为 utf-8
      pattern: 'yyyy-MM-dd.log', // 日志文件按日期（天）切割
      daysToKeep: 7, //  属性指定了保留日志文件的天数
      alwaysIncludePattern: true // 输出的日志文件名是都始终包含 pattern 日期结尾
    },
    // 常规日志输出到文件
    infoFile: {
      type: 'dateFile', // 设置类型为 dateFile
      filename: path.join(__dirname, '../../logs/info'),
      encoding: 'utf-8', // 指定编码格式为 utf-8
      pattern: 'yyyy-MM-dd.log', // 日志文件按日期（天）切割
      daysToKeep: 7, //  属性指定了保留日志文件的天数
      alwaysIncludePattern: true // 输出的日志文件名是都始终包含 pattern 日期结尾
    }
  },
  // 每一个分类对应一个logger
  categories: {
    default: {
      appenders: ['console', 'infoFile'],
      level: log4js.levels.ALL
    },
    errorLogger: {
      appenders: ['errorFile', 'console'],
      level: log4js.levels.ERROR
    },
    infoLogger: {
      appenders: ['infoFile', 'console'],
      level: log4js.levels.INFO
    }
  }
};

// 配置log日志
log4js.configure(config);

const globalLogger = log4js.getLogger();
const errorLogger = log4js.getLogger('errorLogger');
const infoLogger = log4js.getLogger('infoLogger');

module.exports = {
  globalLogger,
  errorLogger,
  infoLogger
};

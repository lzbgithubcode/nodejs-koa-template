const log4js = require('log4js')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

log4js.addLayout(
  'json',
  (config) =>
    function (logEvent) {
      return (
        JSON.stringify(
          {
            env: process.env.NODE_ENV || '',
            uid: logEvent.context.uid || '', // uid
            trace_id: logEvent.context.trace || '', // trace_id
            path: logEvent.context.path || '', // request path
            cost: logEvent.context.cost || '', // costtime
            // 里面有 startTime 等标识日志时间的字段
            ...logEvent
          },
          0
        ) + config.separator
      )
    }
)

// 配置log日志
log4js.configure({
  appenders: {
    // 控制台输出
    consoleOut: {
      type: 'console',
      layout: {
        type: 'colored'
      }
    },

    // 错误日志输出到文件
    fileOut: {
      // 设置类型为 dateFile
      type: 'dateFile',
      filename: path.join(__dirname, '../../logs/logger'),
      // 指定编码格式为 utf-8
      encoding: 'utf-8',
      // 日志文件按日期（天）切割
      pattern: 'yyyy-MM-dd.log',
      // 输出的日志文件名是都始终包含 pattern 日期结尾
      alwaysIncludePattern: true
    }
  },
  // 每一个分类对应一个logger
  categories: {
    default: {
      appenders: ['consoleOut', 'fileOut'],
      level: log4js.levels.ALL
    }
  }
})

const LoggerHandler = async (ctx, next) => {
  // 获取开始时间
  console.log('A-----经过---LoggerHandler--中间件')
  if (!ctx.logger) ctx.logger = log4js.getLogger('default')
  ctx.logger.error('c额手机哦是打发的撒')
  await next()
  console.log('B-----经过---LoggerHandler--中间件')
}

module.exports = LoggerHandler

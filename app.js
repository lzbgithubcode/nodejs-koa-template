const Koa = require('koa')
const { bodyParser } = require('@koa/bodyparser')

const errorHandler = require('./app/middlewares/ErrorHandler')
const loggerHandler = require('./app/middlewares/LoggerHandler')
const corsHandler = require('./app/middlewares/CorsHandler')
const requestHandler = require('./app/middlewares/RequestHandler')

const initRouter = require('./app/routes')

const app = new Koa()

// 错误中间件
app.use(errorHandler)

// 日志中间件
app.use(loggerHandler)

// 参数解析
app.use(bodyParser())

// // 跨域
app.use(corsHandler)

// 请求中间件
app.use(requestHandler)

// 初始化路由
initRouter(app)
module.exports = app

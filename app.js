const Koa = require('koa');
const { bodyParser } = require('@koa/bodyparser');

const errorHandler = require('./app/middlewares/ErrorHandler');
const loggerHandler = require('./app/middlewares/LoggerHandler');
const corsHandler = require('./app/middlewares/CorsHandler');
const requestHandler = require('./app/middlewares/RequestHandler');
const responseHandler = require('./app/middlewares/ResponseHandler');

const initRouter = require('./app/routes');

const app = new Koa();

// 响应中间件
app.use(responseHandler);

// 日志中间件
app.use(loggerHandler);

// 错误中间件
app.use(errorHandler);

// 参数解析
app.use(bodyParser());

// // 跨域
app.use(corsHandler);

// 请求中间件
app.use(requestHandler);

// 初始化路由
initRouter(app);
module.exports = app;

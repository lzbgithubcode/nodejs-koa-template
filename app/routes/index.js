const Router = require('@koa/router');

const userRoutes = require('./userRoutes.js');

const router = new Router();
module.exports = (app) => {
  // 用户相关接口
  router.use('/user', userRoutes.routes(), userRoutes.allowedMethods());

  // 注册路由
  app.use(router.routes()).use(router.allowedMethods());
};

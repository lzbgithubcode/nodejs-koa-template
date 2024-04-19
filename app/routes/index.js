const Router = require('@koa/router')
const initController = require('../controllers')

const router = new Router()
module.exports = (app) => {
  // 初始化路由
  initController(router)

  // 路由
  app.use(router.routes()).use(router.allowedMethods())
}

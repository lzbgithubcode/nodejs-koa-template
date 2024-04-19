const IndexController = require('./IndexController.js')
const indexInstance = new IndexController()
module.exports = (router) => {
  // 根路由
  router.get('/', (ctx, next) => {
    indexInstance.actionIndex(ctx, next)
  })
}

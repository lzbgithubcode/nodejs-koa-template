const BaseController = require('./BaseController')
class IndexController extends BaseController {
  constructor(props) {
    super(props)
  }
  async actionIndex(ctx, next) {
    console.log('async actionIndex---this', this)
  }
}

module.exports = IndexController

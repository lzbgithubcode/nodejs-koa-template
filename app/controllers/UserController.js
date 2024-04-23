const BaseController = require('./BaseController');
class UserController extends BaseController {
  constructor(props) {
    super(props);
  }
  async actionGetAllUsers(ctx, next) {
    console.log('async actionGetAllUsers---this', ctx, this);
  }
}

module.exports = UserController;

const Router = require('@koa/router');
const UserController = require('../controllers/UserController');

const router = new Router();

const userController = new UserController();
// 获取所有用户
router.get('/', (ctx, next) => userController.actionGetAllUsers(ctx, next));

module.exports = router;

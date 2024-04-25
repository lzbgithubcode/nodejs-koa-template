const Router = require('@koa/router');
const UserController = require('../controllers/UserController');

const router = new Router();

const userController = new UserController();
// 获取所有用户
router.get('/', (ctx, next) => userController.actionGetAllUsers(ctx, next));

// 注册
router.get('/register', (ctx, next) => userController.actionUserRegister(ctx, next));

// 登录
router.post('/login', (ctx, next) => userController.actionUserLogin(ctx, next));
module.exports = router;

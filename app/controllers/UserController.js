const BaseController = require('./BaseController');
const { errorLogger } = require('../utils/logger.js');
const UserModel = require('../models/userModel.js');

class UserController extends BaseController {
  constructor(props) {
    super(props);
  }

  /**
   * 用户注册
   * @param {*} ctx
   * @param {*} next
   */
  async actionUserRegister(ctx, next) {
    const userData = ctx.request.body;
    try {
      //保存用户到 MongoDB
      const newUser = new UserModel(userData);
      await newUser.save();
      // // 清除 Redis 缓存
      // redisClient.del('users');

      ctx.body = {
        message: '创建用户成功',
        data: newUser
      };
    } catch (error) {
      errorLogger.warn('创建用户失败');
      ctx.body = {
        message: '创建用户失败',
        code: 500
      };
    }
  }
  /**
   * 用户登录
   * @param {*} ctx
   * @param {*} next
   */
  async actionUserLogin(ctx, next) {}

  /**
   * 获取所有用户
   * @param {*} ctx
   * @param {*} next
   */
  async actionGetAllUsers(ctx, next) {
    try {
      // const { err, cachedUsers } = redisClient.getValue('users');
      // if (err) throw err;
      // if (cachedUsers) {
      //   ctx.body = JSON.parse(cachedUsers);
      //   console.log('从 Redis 缓存中获取数据');
      // } else {
      //   const users = await UserModel.find();
      //   // 将数据存入 Redis 缓存
      //   redisClient.setValue('users', users);
      //   ctx.body = users;
      //   console.log('从 MongoDB 数据库中获取数据');
      // }
      const users = await UserModel.find();
      // // 将数据存入 Redis 缓存
      // redisClient.setValue('users', users);
      ctx.body = users;
      console.log('从 MongoDB 数据库中获取数据');
    } catch (error) {
      ctx.body = { message: error || '获取用户失败' };
    }
  }
}

module.exports = UserController;

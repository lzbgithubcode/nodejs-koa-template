const BaseController = require('./BaseController');
const { errorLogger, globalLogger } = require('../utils/logger.js');
const UserModel = require('../models/userModel.js');
const { redisClient } = require('../db/index.js');

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
      const { userName } = userData;
      // 查询数据库中是否已存在相同的用户名
      const existingUser = await UserModel.findOne({ userName });
      if (existingUser) {
        return (ctx.body = {
          code: 1,
          message: '用户名已存在'
        });
      }
      // 创建新增的用户对象
      const newUser = new UserModel(userData);
      await newUser.save();
      // // 清除 Redis 缓存
      redisClient.deleteKey('users');

      ctx.body = {
        message: '创建用户成功',
        data: newUser
      };
    } catch (error) {
      errorLogger.error('创建用户失败', error);
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
      const cachedUsers = await redisClient.getValue('users');
      let users = [];
      if (cachedUsers) {
        users = cachedUsers;
        globalLogger.log('从 Redis 缓存中获取数据');
      } else {
        users = await UserModel.find();
        // 将数据存入 Redis 缓存
        await redisClient.setValue('users', users);
        globalLogger.log('从 MongoDB 数据库中获取数据');
      }
      ctx.body = {
        data: users
      };
    } catch (error) {
      ctx.body = { code: 1, message: error.message || '获取用户失败' };
    }
  }
}

module.exports = UserController;

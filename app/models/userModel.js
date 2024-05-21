const { mongoDB } = require('../db/index.js');
const { v4 } = require('uuid');

const UserModel = mongoDB.createModel('User', {
  /**
   * 用户名
   */
  userName: { type: String, required: true, unique: true },
  /**
   * 创建时间
   */
  createTime: { type: Date, required: false, default: Date.now() },
  /**
   *  用户id-自定义id
   */
  userId: { type: String, required: false, unique: true, default: v4() }
});
module.exports = UserModel;

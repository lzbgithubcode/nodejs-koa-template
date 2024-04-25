const { mongoDB } = require('../db/index.js');

const UserModel = mongoDB.createModel('User', {
  userName: { type: String, required: true, unique: true }, // 用户名
  createTime: { type: Date, required: true, default: Date.now() } //创建时间
});
module.exports = UserModel;

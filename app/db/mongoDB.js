const mongoose = require('mongoose');
const config = require('../../config/index.js');
const { errorLogger, globalLogger } = require('../utils/logger');

class MongoDB {
  constructor(options = {}) {
    const connectionString = `mongodb://${config.dataLib.host}:${config.dataLib.port}/${config.dataLib.database}`;
    this.options = {
      ...options,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    this.connect(connectionString);
  }
  /**
   *  链接数据库
   * @param {*} connectionString
   */
  async connect(connectionString) {
    try {
      await mongoose.connect(connectionString, this.options);
      globalLogger.info(`😁MongoDB连接成功-${connectionString}`);
    } catch (error) {
      errorLogger.error(`😭MongoDB连接失败- ${connectionString}-${error}`);
      process.exit(1); // 处理连接失败的情况
    }
  }
  /**
   * 创建模型
   * @param {String} name
   * @param {*} schema
   * @returns
   */
  createModel(name, schema) {
    const model = mongoose.model(name, new mongoose.Schema(schema));
    return model;
  }

  /**
   * 断开连接
   */
  disconnect() {
    mongoose.disconnect();
  }
}

module.exports = MongoDB;

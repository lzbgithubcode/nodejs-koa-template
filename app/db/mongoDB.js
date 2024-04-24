const mongoose = require('mongoose');

const { errorLogger, globalLogger } = require('../utils/logger');

class MongoDB {
  constructor(connectionString, options = {}) {
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
      globalLogger.info('MongoDB连接成功');
    } catch (error) {
      errorLogger.error(`MongoDB连接失败--${err}`);
      process.exit(1); // 处理连接失败的情况
    }
  }
  /**
   * 创建模型
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

const Redis = require('ioredis');
const { errorLogger, globalLogger } = require('../utils/logger');

class RedisClient {
  constructor(options) {
    this.client = new Redis(options);
    this.initRedis();
  }
  /**
   * 初始化
   */
  initRedis() {
    this.client.on('connect', () => {
      globalLogger.info('Redis连接成功');
    });

    this.client.on('error', (err) => {
      errorLogger.error(`Redis连接失败--${err}`);
    });
  }
  /**
   *  设置值
   * @param {*} key
   * @param {*} value
   * @param {*} expireTime
   */
  async set(key, value, expireTime = null) {
    try {
      await this.client.set(key, value);
      if (expireTime) {
        await this.client.expire(key, expireTime);
      }
    } catch (err) {
      errorLogger.error(`Redis的set失败key=${key} value = ${value}--${err}`);
    }
  }
  /**
   * 关闭连接，通常在应用关闭时调用
   */
  quit() {
    this.client.quit();
  }
}

module.exports = RedisClient;

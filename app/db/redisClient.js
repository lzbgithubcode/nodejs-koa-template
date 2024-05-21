const Redis = require('ioredis');
const { errorLogger, globalLogger } = require('../utils/logger');
const config = require('../../config/index.js');

class RedisClient {
  constructor(options = {}) {
    const opts = { host: config.dataLib.redisHost, port: config.dataLib.redisPort, ...options };
    this.options = opts;
    this.client = new Redis(opts);
    this.initRedis();
  }
  /**
   * 初始化
   */
  initRedis() {
    this.client.on('connect', (opts) => {
      globalLogger.info(`😁 Redis连接成功${this.options.host}/${this.options.port}`);
    });

    this.client.on('error', (err) => {
      errorLogger.error(`😭 Redis连接失败--${err}`);
      this.quit();
    });
  }
  /**
   *  设置值
   * @param {*} key
   * @param {*} value
   * @param {*} expireTime 默认10分钟
   */
  async setValue(key, value, expireTime = 10 * 60) {
    try {
      // 序列化对象或数组
      const serializedValue = JSON.stringify(value);
      await this.client.set(key, serializedValue);
      if (expireTime) {
        await this.client.expire(key, expireTime);
      }
    } catch (err) {
      errorLogger.error(`😭 Redis的set失败key=${key} value = ${value}--${err}`);
    }
  }
  /**
   *
   * 获取键对应的值
   * @param {string} key 键
   * @returns {Promise<*>} 解析后的值
   */
  async getValue(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }
  /**
   * 删除键
   * @param {string|string[]} keys 单个或多个键
   */
  async deleteKey(keys) {
    if (Array.isArray(keys)) {
      await this.client.del(keys);
    } else {
      await this.client.del([keys]);
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

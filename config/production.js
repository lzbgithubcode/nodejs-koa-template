/**
 * 正式环境
 */
module.exports = {
  // 正式环境
  env: 'production',
  // 端口号
  port: '8008',
  // 数据库
  dataLib: {
    host: '127.0.0.1',
    port: '3306',
    database: 'my_data_base',
    redisHost: '127.0.0.1',
    redisPort: '3307'
  }
};

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
    host: '192.168.18.114',
    port: '27017',
    database: 'my_data_base',
    redisHost: '192.168.18.114',
    redisPort: '6379'
  }
};

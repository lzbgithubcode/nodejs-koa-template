// const RedisClient = require('./redisClient.js');
const MongoDB = require('./mongoDB.js');

// const redisClient = new RedisClient();
const mongoDB = new MongoDB();
module.exports = {
  //   redisClient,
  mongoDB
};

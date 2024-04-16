const envConfig = require("../config");
module.exports = {
  apps: [
    {
      name: "nodejs-koa-template",
      script: "./start.js",
      watch: true,
      ignore_watch: ["node_modules"],
      // 开发环境
      env_development: {
        NODE_ENV: "development",
        PORT: envConfig.port,
      },
      // 正式环境
      env_production: {
        NODE_ENV: "production",
        PORT: envConfig.port,
      },
    },
  ],
};

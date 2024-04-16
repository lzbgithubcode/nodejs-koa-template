const config = require("../config");
const app = require("../app.js");
const os = require("os");

const host = getLocationIPAddress();
const port = validateAndParsePort(config.port);
app.listen(port, host, function () {
  console.log(
    "服务已启动-环境为【%s】,访问地址为 http://%s:%s",
    config.env,
    host,
    port
  );
});

/**
 * 获取服务的地址
 */
function getLocationIPAddress() {
  try {
    const interfaceObj = os.networkInterfaces();
    // 使用 Map 对象以提升遍历性能
    const addresses = new Map(Object.entries(interfaceObj));

    // 使用 for...of 循环遍历接口
    for (const [key, ipList] of addresses) {
      for (const ipItem of ipList) {
        if (
          ipItem.family === "IPv4" &&
          ipItem.address !== "127.0.0.1" &&
          !ipItem.internal
        ) {
          return ipItem.address;
        }
      }
    }
  } catch (error) {
    console.error("获取网络接口信息失败:", error);
    // 可以考虑在这里返回一个默认值或者重新抛出错误，根据具体需求决定。
  }
}

/**
 * 验证 端口号
 */
function validateAndParsePort(val) {
  // 验证输入是否为字符串类型，增强代码健壮性
  if (typeof val !== "string") {
    throw new TypeError("Expected a string as the port value");
  }

  const port = parseInt(val, 10);

  // 检查NaN情况，即无法解析为数字的情况
  if (isNaN(port)) {
    //返回原字符串
    return val;
  }

  // 检查端口号是否在有效范围内
  if (port >= 0 && port <= 65535) {
    // 端口号在有效范围内，返回端口号整数
    return port;
  }
  // 端口号无效，抛出异常而不是返回false，以提供更明确的错误信息
  throw new Error("Invalid port number");
}

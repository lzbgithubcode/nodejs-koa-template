const path = require("path");
let env = process.env.NODE_ENV || "development";
const file = path.resolve(__dirname, env.toLowerCase());
try {
  const envObj = require(file);
  configObj = { ...envObj };
  module.exports = configObj;
} catch (e) {
  throw err;
}

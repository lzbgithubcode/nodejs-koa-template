const CorsHandler = async (ctx, next) => {
  console.log('A-----经过---CorsHandler--中间件')
  const allowOrigin = ctx.get('Origin') || ctx.get('origin') || ctx.get('referer') || ctx.get('Referer') || '*'

  console.log('获取的域名----', allowOrigin)

  // 处理请求跨域
  ctx.set('Access-Control-Allow-Origin', allowOrigin)
  // 设置所允许的HTTP请求方法
  ctx.set('Access-Control-Allow-Methods', 'GET, POST,PUT, OPTIONS, DELETE')

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set('Content-Type', 'application/json;charset=utf-8')

  // 浏览器某些情况下没有带Origin头
  ctx.set('Vary', 'Origin')

  // // 运行cookies
  ctx.set('Access-Control-Allow-Credentials', 'true')
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204
    ctx.body = ''
  } else {
    await next()
    console.log('B-----经过---CorsHandler--中间件')
  }
}

module.exports = CorsHandler

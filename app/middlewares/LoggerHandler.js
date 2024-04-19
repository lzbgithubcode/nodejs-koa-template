const LoggerHandler = async (ctx, next) => {
  // 获取开始时间
  console.log('A-----经过---LoggerHandler--中间件')

  const start = new Date()
  await next()
  console.log('B-----经过---LoggerHandler--中间件')
  // 结束时间
  const ms = new Date() - start

  let logText = `客服端访问node的路由信息:
                   路由方法: ${ctx.method}
                   路由路径: ${ctx.url} 
                   路由请求参数： ${JSON.stringify(ctx.request.body)}
                   路由响应参数： ${JSON.stringify(ctx.body)}
                   路由执行时间:${ms}ms`
  console.log('B-----logText', logText)
}

module.exports = LoggerHandler

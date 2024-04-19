const ErrorHandler = async (ctx, next) => {
  try {
    console.log('A-----经过---ErrorHandler--中间件')
    ctx.logger.error('xxxxxxxxxxxxxxxx')
    ctx.logger.info('dddd')
    await next()
    console.log('B-----经过---ErrorHandler--中间件')
  } catch (err) {
    console.log('C----错误组件捕获到异常------', err)
    return Promise.resolve()
  }
}
module.exports = ErrorHandler

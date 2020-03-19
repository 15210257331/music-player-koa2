function errHandle() {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            }
            // 手动释放error事件, 保证koade error监听函数能够触发，否则监听不到,后台无法捕获错误日志
            ctx.app.emit('error', err, ctx);
        }
    }
}

module.exports = errHandle;
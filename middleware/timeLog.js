function timeLog(options) {
    return async function (ctx, next) {
        console.log(ctx.request.method+ ' ' + ctx.request.url);
        await next();
    }
}

module.exports = timeLog;
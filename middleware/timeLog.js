function timeLog(options) {
    return async function (ctx, next) {
        console.log(ctx.request.method+ ' ' + ctx.request.url);
        if (ctx.request.url === '/') {
            ctx.response.redirect('/api/index'); 
        }
        await next();
    }
}

module.exports = timeLog;
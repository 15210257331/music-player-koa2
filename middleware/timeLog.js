function timeLog(options) {
    return async function (ctx, next) {
        console.log(ctx.request.url);
        if (ctx.request.url === '/') {
            ctx.response.redirect('/api/index'); 
        }
        console.log('来了，老弟！');
        await next();
    }
}

module.exports = timeLog;
function timeLog(options) {
    return async function (ctx, next) {
        console.time(ctx.req.url);
        console.log('来了，老弟！');
        ctx.res.once('finish', function () {
            console.timeEnd(ctx.req.url);
        });
        await next();
    }
}

module.exports = timeLog;
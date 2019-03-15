class ViewController {
    static async index(ctx, next) {
        await ctx.render('index', {
            title: '当你看到这个页面的时候说明服务已经跑起来了'
          })
    }

    static async doc(ctx, next) {
        await ctx.render('doc', {
            title: '文档列表',
            list: '这是数据'
        })
    }
}

module.exports = ViewController;
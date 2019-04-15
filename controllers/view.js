class ViewController {
    static async index(ctx, next) {
        await ctx.render('index', {
            title: '当你看到这个页面的时候说明服务已经跑起来了',
            subTitle: 'koa2版本QQ音乐api',
            guide: '查看文档'
        })
    }

    static async doc(ctx, next) {
        await ctx.render('doc', {
            title: '接口文档',
            list: [
                {
                    url: 'api/user/register',
                    type: 'POST',
                    params: '账号和密码',
                    des: '用户注册'
                },
                {
                    url: 'api/user/login',
                    des: '用户登录'
                },
                {
                    url: 'api/user/logout',
                    des: '登出'
                },
                {
                    url: 'api/user/info',
                    des: '获取用户信息'
                },
            ]
        })
    }
}

module.exports = ViewController;
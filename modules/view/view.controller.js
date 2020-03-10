class ViewController {
    static async index(ctx, next) {
        await ctx.render('index', {
            title: 'simple-pm 相关api接口',
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
                    type: 'POST',
                    params: '账号和密码',
                    des: '用户登录'
                },
                {
                    url: 'api/user/logout',
                    type: 'POST',
                    params: '无',
                    des: '登出'
                },
                {
                    url: 'api/user/info',
                    type: 'POST',
                    params: '无',
                    des: '获取用户信息'
                },
            ]
        })
    }
}

module.exports = ViewController;
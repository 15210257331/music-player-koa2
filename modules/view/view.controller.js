class ViewController {
    static async index(ctx, next) {
        await ctx.render('index', {
            title: '小树下的大蘑菇',
            projectList: [
                {
                    name: '简易项目管理',
                    url: '182.254.178.211:8020'
                },
                {
                    name: '音乐播放器手机端',
                    url: '182.254.178.211:8020'
                },
                {
                    name: '基于angular的组件库',
                    url: '182.254.178.211:8020'
                },
                {
                    name: '音乐播放器pc端',
                    url: '182.254.178.211:8020'
                },
            ]
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
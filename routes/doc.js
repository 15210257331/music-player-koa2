const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '接口文档的列表'
  })
})

module.exports = router

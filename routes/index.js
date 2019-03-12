const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'koa2 server index!'
  })
})

module.exports = router

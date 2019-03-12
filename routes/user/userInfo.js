const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'this is userInfo'
})

router.patch('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

module.exports = router

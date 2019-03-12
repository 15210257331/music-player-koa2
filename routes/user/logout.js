const Router = require('koa-router')
const router = new Router();
const User = require('../../db/user.model');

router.get('/', async (ctx, next) => {
  ctx.session.maxAge = 0;
  ctx.body = {
    result: true,
    msg: '退出成功'
  }
})

module.exports = router
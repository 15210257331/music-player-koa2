const Router = require('koa-router')
const router = new Router();
const User = require('../../db/user.model');

let loginController = async (ctx, next) => {
  let password = ctx.request.query.password;
  let username = ctx.request.query.username;
  try {
    let doc = await User.findOne({
      username: username
    })
    if (!doc) {
      ctx.body = {
        result: false,
        errorMessage: '用户名不存在'
      }
    } else if (doc.password !== password) {
      ctx.body = {
        result: false,
        errorMessage: '密码错误'
      }
    } else {
      ctx.session.userInfo = doc;
      ctx.body = {
        result: true,
        data: doc
      }
    }
  } catch (err) {
    ctx.body = {
      result: false,
      errorMessage: err,
    }
  }
  await next();

}

router.get('/', loginController)

module.exports = router
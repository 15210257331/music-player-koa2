const Router = require('koa-router')
const router = new Router();
const User = require('../../db/user.model');

let queryUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: username
    }, function (err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    })
  })
}

router.get('/', async (ctx, next) => {
  let username = ctx.request.query.username
  let password = ctx.request.query.password;
  try {
    let doc = await queryUser(username, password);
    if (!doc) {
      ctx.body = {
        result: false,
        msg: '用户名不存在'
      }
    } else if (password !== doc.password) {
      ctx.body = {
        result: false,
        msg: '密码错误'
      }
    } else {
      ctx.session.userInfo = doc;
      ctx.body = {
        result: true,
        msg: '登录成功',
        data: doc
      }
    }
  } catch (err) {
    ctx.body = err;
  }
})

module.exports = router
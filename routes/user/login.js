const Router = require('koa-router')
const router = new Router();
const User = require('../../db/user.model');

let queryUser = (username, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username}, function (err, doc) { //通过此model以用户名的条件 查询数据库中的匹配信息
      if (err) {
        reject({
          result: false,
          msg: err
        });
        return;
      }  
      if (!doc) { //查询不到用户名匹配信息，则用户名不存在
        resolve({
          result: false,
          msg: '用户不存在'
        });
        return;
      }
      if (password !== doc.password) { //查询到匹配用户名的信息，但相应的password属性不匹配
        resolve({
          result: false,
          msg: '密码错误'
        });
        return;
      } 
      resolve({
        result: true,
        msg: '登录成功'
      })
    });
  }) 
}

router.get('/', async (ctx, next) => {
  let username = ctx.request.query.username
  let password = ctx.request.query.password;
  ctx.body = await queryUser(username, password);
})

module.exports = router
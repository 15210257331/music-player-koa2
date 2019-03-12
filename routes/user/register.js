const router = require('koa-router')()

router.post('/', async (ctx, next) => {
  let userInfo = ctx.request.body;
  //给新用户一个默认的头像
  Object.assign(userInfo, {
    avatar: avatarUrl
  }); 
  User.findOne({
    username: userInfo.username
  }, function (err, data) {
    if (err) {
      ctx.body = {
        result: false,
        msg: '注册失败'
      }
    } else if (data) {
      ctx.body = {
        result: false,
        msg: '用户名已存在'
      }
    } else {
      User.create(userInfo, function (err, doc) {
        if (err) {
          ctx.body = {
            result: false,
            msg: '注册失败'
          }
        } else {
          ctx.body = {
            result: true,
            msg: '注册成功'
          }
        }
      });
    }
  });
})


module.exports = router
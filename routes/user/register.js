const Router = require('koa-router');
const router = new Router();
const User = require('../../db/user.model');

let registerController = async (ctx, next) => {
  let userInfo = ctx.request.body;
  Object.assign(userInfo, {
    avatar: avatarUrl
  });
  try {
    let doc = await User.findOne({
      username: userInfo.username
    })
    if (doc) {
      ctx.body = {
        result: false,
        errorMessage: '用户名已存在'
      }
    } else {
      await User.create(userInfo);
      ctx.body = {
        result: true,
        data: '注册成功'
      }
    }
  } catch (err) {
    ctx.body = {
      result: false,
      errorMessage: err
    }
  }
  await next();
}
router.post('/', registerController)


module.exports = router
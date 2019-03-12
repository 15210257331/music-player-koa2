const Router = require('koa-router');
const router = new Router();
const multer  = require('multer');
const User = require('../../db/user.model');

const storageZip = multer.diskStorage({
  destination: function(req, file, cb) {
      let avatarPath = path.resolve(__dirname,'../../public/images/avatar'); //会对../进行解析
      cb(null, avatarPath);        //文件存储路径
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.png');    //对文件重新命名，防止文件名冲突
  }
});

const uploadZip = multer({
  storage: storageZip
});

// 获取用户信息
router.get('/', uploadZip.single('avatar'), async (ctx, next) => {
  if (ctx.session.userInfo) {
    ctx.body = {
      result: true,
      msg: '用户信息获取成功',
      data: ctx.session.userInfo
    }
  } else {
    ctx.body = {
      result: false,
      msg: '用户信息获取失败请先登录'
    }
  }
})

// 更新用户信息
router.post('/', async (ctx, next) => {
  let avatarUrl = `http://39.104.147.212:3000/images/avatar${ctx.request.body.file.filename}`;
  User.findOneAndUpdate(
    { _id: ctx.session.userInfo._id},
    {
        $set: {
            avatar: avatarUrl,
            username: ctx.request.body.username,
        }
    },
    {
        new: true
    })
    .then(function(data) {
        ctx.session.userInfo = data; //更新成功更新session中的信息
        ctx.body = {
            result:true,
            msg: '用户信息更新成功',
            data:data
        }
    })
    .catch(function(err) {
        ctx.body = {
            result:false,
            msg: err
        }
    });
})

module.exports = router

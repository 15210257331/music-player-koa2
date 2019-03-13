const Router = require('koa-router');
const router = new Router();
const multer = require('multer');
const User = require('../../db/user.model');

const storageZip = multer.diskStorage({
  destination: function (req, file, cb) {
    let avatarPath = path.resolve(__dirname, '../../public/images/avatar'); //会对../进行解析
    cb(null, avatarPath); //文件存储路径
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png'); //对文件重新命名，防止文件名冲突
  }
});

const uploadZip = multer({
  storage: storageZip
});

let getUserInfo = async (ctx, next) => {
  if (ctx.session.userInfo) {
    ctx.body = {
      result: true,
      data: ctx.session.userInfo
    }
  } else {
    ctx.body = {
      result: false,
      errorMessage: '请登录'
    }
  }
  await next();
}

let updateUserInfo = async (ctx, next) => {
  let newAvatar = `http://39.104.147.212:3000/images/avatar${ctx.request.body.file.filename}`;
  let newUsername = ctx.request.body.username
  try {
    let doc = await User.findOneAndUpdate({
      _id: ctx.session.userInfo._id
    }, {
      $set: {
        avatar: newAvatar,
        username: newUsername,
      }
    }, {
      new: true
    })
    ctx.session.userInfo = doc;
    ctx.body = {
      result: true,
      data: doc
    }
  } catch (err) {
    ctx.body = {
      result: false,
      errorMessage: err
    }  
  }
  await next();
}

// 获取用户信息
router.get('/', getUserInfo)

// 更新用户信息
router.post('/', uploadZip.single('avatar'),updateUserInfo);

module.exports = router
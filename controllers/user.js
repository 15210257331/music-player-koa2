const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../database/user.model');
const config = require('../config');


class UserController {
  static async login(ctx, next) {
    let password = ctx.request.body.password;
    let username = ctx.request.body.username;
    try {
      let doc = await User.findOne({
        username: username
      })
      if (!doc) {
        ctx.body = {
          code: 999,
          msg: '用户名不存在'
        }
      } else if (doc.password !== password) {
        ctx.body = {
          code: 999,
          msg: '密码错误'
        }
      } else {
        const userInfo = {
          username: doc.username,
          _id: doc._id,
        }
        const token = await jwt.sign(userInfo, config.secret, { expiresIn: 60*60 })  //token签名 有效期为1小时
        ctx.body = {
          code: 200,
          token: token,
          msg: '登陆成功'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        token: null,
        msg: '登录失败'
      }
    }
    await next();
  }

  // 注册
  static async register(ctx, next) {
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
          msg: '用户名已存在！'
        }
      } else {
        await User.create(userInfo);
        ctx.body = {
          result: true,
          msg: '注册成功！'
        }
      }
    } catch (err) {
      ctx.body = {
        result: false,
        msg: err
      }
    }
    await next();
  }

  // 获取用户信息
  static async getUserInfo(ctx, next) {
    ctx.body = {
      result: true,
      code: 200,
      data: ctx.state.userInfo,
      msg: '用户信息获取成功'
    }
    await next();
  }

  static async uploadImg() {
    const storageZip = multer.diskStorage({
      destination: function (req, file, cb) {
        let avatarPath = path.resolve(__dirname, '../public/images/avatar'); //会对../进行解析
        cb(null, avatarPath); //文件存储路径
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png'); //对文件重新命名，防止文件名冲突
      }
    });

    return multer({
      storage: storageZip
    });
  }

  // 先将图片上传到服务器返回图片的地址, 将图片的地址传到后台
  static async updateUserInfo(ctx, next) {
    let newAvatar = `http://39.104.147.212:3000/images/avatar${ctx.request.body.file.filename}`;
    let newUsername = ctx.request.body.username;
    let newNickname = ctx.request.body.newNickname;
    try {
      let doc = await User.findOneAndUpdate({
        _id: ctx.session.userInfo._id
      }, {
          $set: {
            avatar: newAvatar,
            username: newUsername,
            nickname: newNickname
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
        err: err
      }
    }
  }

  // 删除用户
  static async delete(ctx) {
    ctx.body = {
      result: true,
      data: '成功!'
    }
  }
}

module.exports = UserController;
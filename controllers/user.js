const multer = require('multer');
const User = require('../database/user.model');



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
              result: false,
              err: '用户名不存在'
            }
          } else if (doc.password !== password) {
            ctx.body = {
              result: false,
              err: '密码错误'
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
            err: err,
          }
        }
        // await next();
    }

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
        // await next();
      }
 
      static async getUserInfo(ctx, next) {
        if (ctx.session.userInfo) {
            ctx.body = {
              result: true,
              data: ctx.session.userInfo
            }
          } else {
            ctx.body = {
              result: false,
              err: '请登录'
            }
          }
      }

      static async uploadImg() {
        const storageZip = multer.diskStorage({
            destination: function (req, file, cb) {
              let avatarPath = path.resolve(__dirname, '../../public/images/avatar'); //会对../进行解析
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

      static async logout(ctx, next) {
        ctx.session.maxAge = 0;
        ctx.body = {
          result: true,
          data: '退出成功'
        }
      }

      static async delete(ctx) {
        ctx.body = {
            result: true,
            data: '成功!'
        }
      }
}

module.exports = UserController;
const jwt = require('jsonwebtoken');
const User = require('./user.model');
const config = require('../../common/config');
const Role = require('../role/role.model');
const helper = require('../../common/helper');
class UserController {

  // 登录
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
        const token = await jwt.sign(userInfo, config.secret, { expiresIn: 60 * 60 * 24 * 7 })  //token签名 有效期为7天
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

  // 注册 / 添加成员
  static async register(ctx, next) {
    let userInfo = ctx.request.body;
    const defaultAvatarUrl = `${config.host}:${config.port}/images/avatar/avatar-default.png`;
    Object.assign(userInfo, {
      avatar: defaultAvatarUrl
    });
    try {
      let doc = await User.findOne({
        username: userInfo.username
      })
      if (doc) {
        ctx.body = {
          code: 999,
          msg: '用户名已存在！'
        }
      } else {
        await User.create(userInfo);
        ctx.body = {
          code: 200,
          msg: '注册成功！'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        msg: err
      }
    }
    await next();
  }

  // 获取用户信息
  static async getUserInfo(ctx, next) {
    // 查询当前用户所有角色
    const roles = await Role.find({ "_id": { $in: ctx.state.userInfo.role } });
    const authority = roles.filter(item => item.authority.length > 0).map(item => item.authority);
    const data = Array.from(new Set(helper.flatten(authority)))
    const doc = Object.assign({}, ctx.state.userInfo._doc, {
      authority: data
    })
    ctx.body = {
      result: true,
      code: 200,
      data: doc,
      msg: '用户信息获取成功'
    }
    await next();
  }

  static async uploadImg(ctx, next) {
    const avatarUrl = `${config.host}:${config.port}/images/avatar/${ctx.req.file.filename}`;
    ctx.body = {
      code: 200,
      data: avatarUrl,
      msg: '图片上传成功'
    }
  }

  static async updateUserInfo(ctx, next) {
    let newAvatar = ctx.request.body.avatar;
    let newUsername = ctx.request.body.username;
    let newNickname = ctx.request.body.nickname;
    let newEmail = ctx.request.body.email;
    let newIntroduction = ctx.request.body.introduction;
    try {
      let doc = await User.findOneAndUpdate({
        _id: ctx.state.userInfo._id
      }, {
        $set: {
          avatar: newAvatar,
          username: newUsername,
          nickname: newNickname,
          email: newEmail,
          introduction: newIntroduction
        }
      }, {
        new: true
      })
      ctx.body = {
        code: 200,
        data: doc
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        err: err
      }
    }
  }

  // 设置用户角色
  static async setMemberRole(ctx, next) {
    const memberId = ctx.request.body.memberId;
    const updateData = {
      role: ctx.request.body.roleIds
    }
    try {
      let doc = await User.findOneAndUpdate({ _id: memberId }, { $set: updateData }, { new: true });
      if (doc) {
        ctx.body = {
          code: 200,
          data: doc,
          msg: '操作成功'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        msg: err
      }
    }
  }

  // 获取所有用户列表
  static async memberList(ctx, next) {
    const name = ctx.request.body.name;
    const reg = new RegExp(name, 'i');
    try {
      const users = await User.find({ "nickname": { $regex: reg } }).sort({ update_at: -1 });
      const rolesPromise = users.map(item => Role.find({ "_id": { $in: item.role } }));
      const roles = await Promise.all(rolesPromise);
      const doc = users.map((item, i) => {
        return Object.assign({}, item._doc, {
          role: roles[i]
        })
      })
      if (doc) {
        ctx.body = {
          code: 200,
          data: doc,
          msg: '成员列表获取成功！'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        msg: err
      }
    }
  }

  // 删除成员
  static async deleteMember(ctx) {
    let userId = ctx.request.query.id;
    try {
      let doc = await User.deleteOne({ _id: userId })
      if (doc) {
        ctx.body = {
          code: 200,
          data: userId,
          msg: '删除成功'
        }
      }
    } catch (err) {
      ctx.body = {
        code: 999,
        data: '删除失败',
        msg: err
      }
    }
  }
}

module.exports = UserController;
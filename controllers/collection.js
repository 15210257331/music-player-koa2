const Collection = require('../db/collection.model');

class CollectionController {

  static async getCollection(ctx, next) {
    if (!ctx.session.userInfo) {
      ctx.body = {
        result: false,
        err:'请登录'
      }
      return;
    }
    console.log(ctx.session.userInfo);
    let userId = ctx.session.userInfo._id;
    try {
      let doc = await Collection.find({
        userId: userId
      })
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

  static async addCollection(ctx, next) {
    const data = {
      userId: ctx.session.userInfo._id,
      songId: ctx.request.body.songId,
      addTime: new Date().getTime()
    }
    let doc = await Collection.findOne({
      songId: data.songId,
      userId: data.userId
    })
    if (doc) {
      ctx.body = {
        result: false,
        err: '已收藏'
      }
    } else {
      try {
        await Collection.create(data)
        ctx.body = {
          result: true,
          msg: '收藏成功'
        }
      } catch (err) {
        ctx.body = {
          result: false,
          msg: err
        }
      }
    }
  }
  static async delete(ctx, next) {
    let songId = ctx.request.query.songId;
    let userId = ctx.session.userId;
    try {
      let doc = await Collection.deleteOne({
        songId: songId,
        userId: userId
      })
      ctx.body = {
        result: true,
        data: '取消收藏成功'
      }
    } catch (err) {
      ctx.body = {
        result: false,
        err: err
      }
    }
  }
}


module.exports = CollectionController
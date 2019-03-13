const Router = require('koa-router')
const router = new Router();
const Collection = require('../../db/collection.model');

let collection = async (ctx, next) => {
    const data = {
        userId: ctx.request.body.userId,
        songId: ctx.request.body.songId,
        addTime: new Date().getTime()
    }
    let doc = await Collection.findOne({
        songId: data.songId,
        userId: data.userId
    })
    // console.log(doc);
    if (doc) {
        ctx.body = {
            result: false,
            msg: '已收藏'
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
    await next();
}


router.post('/', collection)


module.exports = router
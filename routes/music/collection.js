const Router = require('koa-router')
const router = new Router();
const Collection = require('../../db/collection.model');

let querySong = (ctx, data) => {
    return new Promise((resolve, reject) => {
        Collection.findOne({
            songId: data.songId
        }, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                if (!doc) {
                    Collection.create(data, function (err, doc1) {
                        if (err) {
                            reject(err);
                        } else {
                            ctx.body = {
                                result: true,
                                msg: '收藏成功'
                            }
                            resolve();
                        }
                    });
                } else {
                    ctx.body = {
                        result: false,
                        msg: '已收藏'
                    }
                }
            }
        })
    })
}


router.post('/', async (ctx, next) => {
    let data = {
        userId: ctx.request.userId,
        songId: ctx.request.songId,
        addTime: new Date().getTime()
    }
    await querySong(ctx, data);
})

module.exports = router
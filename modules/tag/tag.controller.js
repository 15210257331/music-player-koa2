const Tag = require("./tag.model");
const helper = require('../../utils/helper');

class TagController {

    // 新增tag
    static async addTag(ctx, next) {
        const data = Object.assign({}, ctx.request.body, {
        })
        try {
            let doc = await Tag.create(data);
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: 'tag添加成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '任务添加失败',
                msg: err
            }
        }
    }
    static async tagList(ctx, next) {
        try {
            let doc = await Tag.find({});
            //console.log(doc);
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '获取成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '失败',
                msg: err
            }
        }
    }
}

module.exports = TagController;
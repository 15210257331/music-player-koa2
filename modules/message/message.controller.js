const Message = require("./message.model");
const helper = require('../../common/helper');

class MessageController {

    // 获取消息记录
    static async getMessages(ctx, next) {
        const targetId = ctx.request.query.id.toString(); // 目标好友的用户ID
        const userId = ctx.state.userInfo._id.toString(); // 当前登录用户ID
        try {
            // 目标好友发给我的消息
            let doc1 = await Message.find({ 'from': targetId, 'to': userId });
            // 我发给目标好友的消息
            let doc2 = await Message.find({ 'from': userId, 'to': targetId });
            let doc = doc1.concat(doc2).sort(function (a, b) {
                return a.msgDate - b.msgDate;
            })
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
                data: '获取失败',
                msg: err
            }
        }
    }
}

module.exports = MessageController;
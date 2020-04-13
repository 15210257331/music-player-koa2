const Message = require("./message.model");
const helper = require('../../common/helper');
const Chats = require('./chats.model');

class MessageController {

    // 获取消息记录
    static async getMessages(ctx, next) {
        const targetId = ctx.request.query.id.toString(); // 目标好友的用户ID
        const userId = ctx.state.userInfo._id.toString(); // 当前登录用户ID
        try {
            // 目标好友发给我的消息
            let doc1 = await Message
                .find({ 'from': targetId, 'to': userId })
                .populate('from', 'avatar')
                .populate('to', 'avatar')
            // 我发给目标好友的消息
            let doc2 = await Message
                .find({ 'from': userId, 'to': targetId })
                .populate('from', 'avatar')
                .populate('to', 'avatar')
            let doc = doc1.concat(doc2).sort(function (a, b) {
                return a.msgTime - b.msgTime;
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

    // 更改消息读取状态
    static async messageStatus(ctx, next) {
        const msgId = ctx.request.query.id;
        try {
            await Message.update({ _id: msgId }, { $set: { isReade: true } });
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '服务器错误',
                msg: err
            }
        }
    }

    // 获取chat列表
    static async getChatList(ctx, next) {
        const userId = ctx.state.userInfo._id;
        try {
            const doc = await Chats
                .find({ "from": userId })
                .populate('from')
                .populate('to')
                .populate('lastMessage')
                .sort({ 'createTime': -1 })
            // 我发给目标好友的消息
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

    // 保存chat
    static async addChat(ctx, next) {
        const body = ctx.request.body;
        try {
            const doc = await Chats.create(body);
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '保存成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '保存失败',
                msg: err
            }
        }
    }

    // 更新chat
    static async updateChatList(ctx, next) {
        const chatId = ctx.request.body.id;
        const messageId = ctx.request.body.messageId;
        try {
            const doc = await Chats
                .findOneAndUpdate(
                    { '_id': chatId },
                    {
                        $set: {
                            lastMessage: messageId
                        }
                    },
                    { new: true })
                .populate('from')
                .populate('to')
                .populate('lastMessage')
                .sort({ 'createTime': -1 })
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '更新成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '更新失败',
                msg: err
            }
        }
    }
}

module.exports = MessageController;
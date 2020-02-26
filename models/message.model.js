const mongoose = require('../utils/db');

const messageSchema = new mongoose.Schema({
    from: String, // 发送人ID
    to: String, // 接收人ID
    msgType: Number, // 消息类型 1 文本消息  2 其它
    msg: String, // 消息内容
    msgDate: Number // 发送消息时间
});

module.exports = mongoose.model('messages', messageSchema);

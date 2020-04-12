const mongoose = require('../../common/db');

const messageSchema = new mongoose.Schema({
    // 发送人ID
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    // 接收人ID
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    // 消息类型 1 文本消息  2 其它
    msgType: {
        type: Number,
        required: true
    },
    // 消息内容
    content: {
        type: String,
        required: true
    },
    // 发送消息时间
    msgTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    // 是否已读 默认是未读的
    isReade: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('messages', messageSchema);

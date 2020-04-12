const mongoose = require('../../common/db');

// 聊天信息从接口取得不要存在本地了
const chatsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    other: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages',
        required: false
    },
    unreadCount: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('chats', chatsSchema);

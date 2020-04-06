const mongoose = require('../../common/db');

// 聊天信息从接口取得不要存在本地了
const chatsSchema = new mongoose.Schema({
    numbers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    messages: [
        {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            type: {
                type: Number,
                default: 1
            },
            content: {
                type: String,
                required: true
            },
            sendTime: {
                type: Date,
                default: Date.now
            },
            // 是否已读 默认是未读的
            isReade: {
                type: Boolean,
                default: false
            }
        }
    ]
});

module.exports = mongoose.model('chats', chatsSchema);

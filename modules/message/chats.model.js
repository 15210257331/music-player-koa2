const mongoose = require('../../common/db');

const chatsSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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

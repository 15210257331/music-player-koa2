const mongoose = require('../../common/db');

const userSchema = new mongoose.Schema({
    // 账号
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // 昵称
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    introduction: {
        type: String
    },
    // 1 男  2 女
    sex: {
        type: Number,
        required: true,
        default: 1
    },
    // 用户状态
    status: {
        type: Number,
        default: 1
    },
    role: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role'
        }
    ]
});

module.exports = mongoose.model('users', userSchema);

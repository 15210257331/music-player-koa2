const mongoose = require('../../common/db');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    star: {
        type: Boolean,
        default: false
    },
    // 1 正常 2 异常
    status: {
        type: Number,
        default: 1
    },
    // 任务
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tasks'
        }
    ],
    // 项目创建人
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // 项目成员
    participant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    // 项目标签
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag'
        }
    ],
    // 项目标签
    type: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'type'
        }
    ],
    createTime: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('projects', projectSchema);

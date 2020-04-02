const mongoose = require('../../common/db');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    endTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    // 1未开始  2进行中  3已完成  4已作废  5 已删除
    status: {
        type: Number,
        default: 1,
        required: true
    },
    type: {
        type: Number,
        default: 1,
        required: true
    },
    // 任务标签
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag'
        }
    ],
    // 任务负责人
    principal: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    // 项目编号
    number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('tasks', taskSchema);

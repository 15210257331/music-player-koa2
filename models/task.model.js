const mongoose = require('../utils/db');

const taskSchema = new mongoose.Schema({
    name : String,
    content : String,
    startTime: Object, // 开始时间
    endTime: Object,  // 结束时间
    status: Number,    // 1未开始  2进行中  3已完成  4已作废 
    projectId: String,
    tag: Array,        // 任务标签
    comment: Array,   // 任务评论
    principal: Object   // 任务负责人
});

module.exports = mongoose.model('tasks',taskSchema);

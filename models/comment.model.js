const mongoose = require('../utils/db');

const commentSchema = new mongoose.Schema({
    author: Object, // 评论人
    content: String, // 评论内容
    time: Object, // 评论时间
    taskId: String // 任务ID
});

module.exports = mongoose.model('comment', commentSchema);

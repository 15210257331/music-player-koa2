const mongoose = require('../../common/db');

const commentSchema = new mongoose.Schema({
    commentAuthor: Object, // 评论人
    content: String, // 评论内容
    commentTime: Object, // 评论时间
    taskId: String // 任务ID
});

module.exports = mongoose.model('comments', commentSchema);

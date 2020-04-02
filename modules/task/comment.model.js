const mongoose = require('../../common/db');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('comments', commentSchema);

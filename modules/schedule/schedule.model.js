const mongoose = require('../../common/db');

const scheduleSchema = new mongoose.Schema({
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
    // 创建人
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    // 参与人
    participant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
});

module.exports = mongoose.model('schedules', scheduleSchema);

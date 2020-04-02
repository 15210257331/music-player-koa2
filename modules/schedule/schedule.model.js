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
    // ref属性值是model名称
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    participant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }]
});

module.exports = mongoose.model('schedules', scheduleSchema);

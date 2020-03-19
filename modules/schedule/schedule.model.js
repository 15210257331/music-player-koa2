const mongoose = require('../../common/db');

const scheduleSchema = new mongoose.Schema({
    name : String,
    content : String,
    startTime: Number, // 开始时间
    endTime: Number,  // 结束时间
    organizer: Object, // 发起人
    participant: Array // 参与者
});

module.exports = mongoose.model('schedules',scheduleSchema);

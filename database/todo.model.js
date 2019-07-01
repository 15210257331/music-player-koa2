const mongoose = require('./db');

const todoSchema = new mongoose.Schema({
    title : String,
    content : String,
    time: Number,  // 时间戳  13位以毫秒位单位
    remind: Boolean,
    remark: String,
    status: Number, // 0 未完成  1 已完成
    userId: String
});

module.exports = mongoose.model('todos',todoSchema);

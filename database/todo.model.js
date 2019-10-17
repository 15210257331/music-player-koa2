const mongoose = require('./db');

const todoSchema = new mongoose.Schema({
    name : String,
    content : String,
    deadline: Number,  // 时间戳  13位以毫秒位单位
    remind: Boolean,   // 是否提醒
    status: Number, // 1未开始  2进行中  3已完成  4已作废 
    userId: String
});

module.exports = mongoose.model('todos',todoSchema);

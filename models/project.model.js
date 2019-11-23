const mongoose = require('../utils/db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    task: Array,
    creater: String, // 项目创建人ID
    member: Array, // 项目成员IDlist
    createDate: Date // 创建时间
});

module.exports = mongoose.model('projects',projectSchema);

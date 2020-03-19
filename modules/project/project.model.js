const mongoose = require('../../common/db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    task: Array,
    creater: String, // 项目创建人ID
    member: Array, // 项目成员IDlist
    createDate: Date, // 创建时间,
    cover: String, // 项目封面
});

module.exports = mongoose.model('projects',projectSchema);

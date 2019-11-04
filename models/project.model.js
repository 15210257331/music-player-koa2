const mongoose = require('../utils/db');

const projectSchema = new mongoose.Schema({
    name : String,
    content : String,
    task: Array,
    creater: Object, // 项目创建人
    member: Array, // 项目成员
    createDate: Object // 创建时间
});

module.exports = mongoose.model('projects',projectSchema);

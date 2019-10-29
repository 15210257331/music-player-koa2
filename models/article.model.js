const mongoose = require('../utils/db');

const articleSchema = new mongoose.Schema({
    title :String,
    subtitle : String,
    content : String,
    createTime: Date,
    updateTime: Date,
    category: String
});

//第一个参数代表数据库对应的表的名字，后边如果没有s的话会自动加上s，而且首字母会变成小写，如果生成Schema实例的时候指定了表的名字就用指定的名字
module.exports = mongoose.model('articles',articleSchema);

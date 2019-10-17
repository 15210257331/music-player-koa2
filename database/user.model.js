const mongoose = require('./db.js');

//生成数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const userSchema = new mongoose.Schema({
    username :String,
    nickname: String,
    password : String,
    email: String,
    avator : String,
    introduction: String,
    role: String,
    permission: Array
});

//第一个参数代表数据库对应的表的名字，后边如果没有s的话会自动加上s，而且首字母会变成小写，如果生成Schema实例的时候指定了表的名字就用指定的名字
module.exports = mongoose.model('users',userSchema);

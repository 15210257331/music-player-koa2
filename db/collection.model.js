const mongoose = require('./db.js');

//生成数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const collections = new mongoose.Schema({
    userId :String,
    songId : String,
    addTime : String,
});

module.exports = mongoose.model('collections',collections);

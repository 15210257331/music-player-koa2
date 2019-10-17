const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/todo"; // 连接today数据库


//连接数据库
mongoose.connect(url,{useNewUrlParser:true});

mongoose.connection.on('connected', function () {
    console.log('');
    console.log('connection to ' + url + ' successful');
});


mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;

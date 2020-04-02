const mongoose = require('mongoose');
const config = require('./config');

const url = `mongodb://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`;

//连接数据库
mongoose.set('useCreateIndex', true);
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

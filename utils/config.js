const path = require('path');

 const config = {
    port: '3001', // 服务端口
    secret: 'secret', // token 秘钥
    prefix: '/api', // 接口前缀
    mongoDB: {
        database: 'todo',
        username: 'root',
        password: 'root',
        host: 'localhost',
        port: 27017
    }
}

module.exports = config;
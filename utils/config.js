const path = require('path');

 const config = {
    port: '4000', // 服务端口
    secret: 'secret', // token 秘钥
    prefix: '/api', // 接口前缀
    mongoDB: {
        database: 'pm',
        username: 'test',
        password: 'test',
        host: '182.254.178.211',
        port: 27017
    }
}

module.exports = config;
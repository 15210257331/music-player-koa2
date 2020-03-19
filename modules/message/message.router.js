const Router = require('koa-router')
const MessageController = require('./message.controller');
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})


// 消息列表
router.get('/message/list', MessageController.getMessages);



module.exports = router
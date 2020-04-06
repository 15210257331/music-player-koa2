const Router = require('koa-router')
const MessageController = require('./message.controller');
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})


// 消息列表
router.get('/message/list', MessageController.getMessages);
// 更改消息读取状态
router.get('/message/status', MessageController.messageStatus);



module.exports = router
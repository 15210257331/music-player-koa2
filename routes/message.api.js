const Router = require('koa-router')
const MessageController = require('../controllers/message');
const config = require('../utils/config');

const router = new Router({
    prefix: config.prefix
})


// project 列表
router.get('/message/list', MessageController.getMessages);



module.exports = router
const Router = require('koa-router')
const TagController = require('./tag.controller');
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})

// 添加tag
router.post('/tag/add', TagController.addTag);
// 添加tag
router.get('/tag/list', TagController.tagList);



module.exports = router
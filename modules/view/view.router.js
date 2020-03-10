const Router = require('koa-router')
const ViewController = require('./view.controller')
const config = require('../../utils/config');

const router = new Router({
    prefix: config.prefix
})

// index
router.get('/index', ViewController.index);
// doc
router.get('/doc', ViewController.doc);

module.exports = router
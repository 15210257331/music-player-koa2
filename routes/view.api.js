const Router = require('koa-router')
const ViewController = require('../controllers/view')


const router = new Router({
    prefix: '/api'
})

/**
 * view
 */
// index
router.get('/index', ViewController.index);
// doc
router.get('/doc', ViewController.doc);

module.exports = router
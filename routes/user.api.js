const Router = require('koa-router')
const UserController = require('../controllers/user')
const ViewController = require('../controllers/view')
const HeroController = require('../controllers/hero');
const ArticleController = require('../controllers/article');
const TaskController = require('../controllers/task');
const ProjectController = require('../controllers/project');

const router = new Router({
    prefix: '/api'
})


/**
 * 用户
 */
// 用户注册
router.post('/user/register', UserController.register);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 修改用户信息
router.patch('/user/info', UserController.uploadImg, UserController.updateUserInfo);

module.exports = router;
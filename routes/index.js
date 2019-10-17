const Router = require('koa-router')
const UserController = require('../controllers/user')
const ViewController = require('../controllers/view')
const HeroController = require('../controllers/hero');
const ArticleController = require('../controllers/article');
const TodoController = require('../controllers/todo');

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


// todo
router.post('/todo/list', TodoController.getTodoList);
router.get('/todo/list/all', TodoController.getAllTodoList);
// 添加todo
router.post('/todo/add', TodoController.addTodo);
router.post('/todo/update', TodoController.updateTodo);
// 删除delete
router.get('/todo/delete', TodoController.deleteTodo);
// 修改todo 状态
router.post('/todo/status', TodoController.changeStatus);

//article
router.post('/article/add', ArticleController.addArticle);
router.post('/article/list', ArticleController.getArticle);
router.get('/article/:id', ArticleController.getArticleDetailById);

/**
 * hero
 */
//分页获取英雄列表
router.post('/heros/list', HeroController.getHerosList);
// 根据id获取英雄详情
router.get('/hero/:heroId', HeroController.getHeroById);


module.exports = router
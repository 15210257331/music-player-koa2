const Router = require('koa-router')
const UserController = require('../controllers/user')
const ViewController = require('../controllers/view')
const SonglistController = require('../controllers/songlist');
const CollectionController = require('../controllers/collection');


const router = new Router({
    prefix: '/api/v1'
})

/**
 * view 展示
 */
// view
router.get('/index', ViewController.index);
// doc
router.get('/doc', ViewController.doc);


/**
 * 用户接口
 */
// 用户注册
router.post('/user/register', UserController.register);
// 用户登录
router.get('/user/login', UserController.login);
// 用户登出
router.delete('/user/logout', UserController.logout);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 修改用户信息
router.patch('/user/info', UserController.uploadConfig, UserController.updateUserInfo);


/**
 * 我的收藏
 */
// 收藏列表
router.get('/collection', CollectionController.getCollection);
// 添加到收藏
router.post('/collection', CollectionController.addCollection);


/**
 * 我的歌单
 */
// 获取歌单
router.get('/songlist', SonglistController.getSonglist);
// 新建歌单
router.post('/songlist', SonglistController.newSonglist);

module.exports = router
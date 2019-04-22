const Router = require('koa-router')
const UserController = require('../controllers/user')
const ViewController = require('../controllers/view')
const SonglistController = require('../controllers/songlist');
const CollectionController = require('../controllers/collection');
const MusicController = require('../controllers/music');
const HeroController = require('../controllers/hero');

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
// 用户登出
router.delete('/user/logout', UserController.logout);
// 删除用户
router.delete('/user/delete/:id', UserController.delete);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 修改用户信息
router.patch('/user/info', UserController.uploadImg, UserController.updateUserInfo);


/**
 * 音乐
 */
// banner
router.get('/music/banner', MusicController.banner);
// 搜索
router.post('/music/search', MusicController.search);
// 音乐详情
router.get('/musci/detail', MusicController.detail);
// 音乐url
router.get('/musci/url', MusicController.url);
// 音乐歌词
router.get('/musci/lyric', MusicController.lyric);
// 收藏列表
router.get('/collection', CollectionController.getCollection);
// 添加到收藏
router.post('/collection', CollectionController.addCollection);
// 取消收藏
router.delete('/collection/:songId', CollectionController.delete);
// 获取歌单
router.get('/songlist', SonglistController.getSonglist);
// 新建歌单
router.post('/songlist', SonglistController.newSonglist);

/**
 * hero
 */
//分页获取英雄列表
router.post('/heros/list', HeroController.getHerosList);
// 根据id获取英雄详情
router.get('/hero/:heroId', HeroController.getHeroById);


module.exports = router
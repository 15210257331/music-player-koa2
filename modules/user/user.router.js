const Router = require('koa-router')
const UserController = require('./user.controller')
const RoleController = require('../role/role.controller')
const multer = require('koa-multer');
const path = require('path');
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})

const storageZip = multer.diskStorage({
    destination: function (req, file, cb) {
        let avatarPath = path.resolve(__dirname, '../../public/images/avatar'); //会对../进行解析
        console.log(avatarPath);
        cb(null, avatarPath); //文件存储路径
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png'); //对文件重新命名，防止文件名冲突
    }
});

var upload = multer({ storage: storageZip });

// 用户注册
router.post('/user/register', UserController.register);
// 用户登录
router.post('/user/login', UserController.login);
// 删除用户
router.get('/user/delete', UserController.deleteMember);
// 获取用户信息
router.get('/user/info', UserController.getUserInfo);
// 修改用户信息
router.post('/user/info/update', UserController.updateUserInfo);
// 上传用户头像
router.post('/user/uploadImg', upload.single('avatar'), UserController.uploadImg);
// 用户列表
router.post('/user/list', UserController.memberList);
// 设置用户角色
router.post('/user/setMemberRole', UserController.setMemberRole);

module.exports = router;
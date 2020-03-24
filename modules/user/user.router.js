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
// 上传图片
router.post('/user/uploadImg', upload.single('avatar'), UserController.uploadImg);
// 成员列表
router.post('/user/list', UserController.memberList);
// 设置成员角色
router.post('/user/setMemberRole', UserController.setMemberRole);

// 角色列表
router.post('/role/list', RoleController.getRole);
// 添加角色
router.post('/role/add', RoleController.addRole);
// 修改角色
router.post('/role/update', RoleController.updateRole);
// 删除角色
router.get('/role/delete', RoleController.deleteRole);
// 角色关联权限
router.post('/role/setAuthority', RoleController.setAuthority);

module.exports = router;
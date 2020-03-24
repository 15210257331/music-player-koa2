const Router = require('koa-router')
const UserController = require('../user/user.controller')
const RoleController = require('./role.controller')
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})

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
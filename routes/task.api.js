const Router = require('koa-router')
const TaskController = require('../controllers/task');
const config = require('../utils/config');

const router = new Router({
    prefix: config.prefix
})

// 所有task列表
router.get('/task/list/all', TaskController.getAllTask);
// 添加task
router.post('/task/add', TaskController.addTask);
// 切换task状态
router.post('/task/status', TaskController.updateTaskStatus);
// 删除delete
router.get('/task/delete', TaskController.deleteTask);

module.exports = router
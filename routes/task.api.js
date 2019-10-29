const Router = require('koa-router')
const TaskController = require('../controllers/task');

const router = new Router({
    prefix: '/api'
})

/**
 * task api
 */
// task列表
router.get('/task/list', TaskController.getTaskList);
// 添加task
router.post('/task/add', TaskController.addTask);
// 切换task状态
router.post('/task/status', TaskController.updateTaskStatus);
// 删除delete
router.get('/task/delete', TaskController.deleteTask);

module.exports = router
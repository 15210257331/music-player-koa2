const Router = require('koa-router')
const TaskController = require('../controllers/task');
const config = require('../utils/config');

const router = new Router({
    prefix: config.prefix
})

// 添加task
router.post('/task/add', TaskController.addTask);
// 切换task状态
router.post('/task/status', TaskController.updateTaskStatus);
// 删除delete
router.get('/task/delete', TaskController.deleteTask);
// 添加任务评论
router.post('/task/comment/add', TaskController.addTaskComment);
// 获取任务评论
router.get('/task/comment', TaskController.getTaskComment);



module.exports = router
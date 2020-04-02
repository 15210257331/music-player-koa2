const Router = require('koa-router')
const TaskController = require('./task.controller');
const config = require('../../common/config');

const router = new Router({
    prefix: config.prefix
})

// 添加任务
router.post('/task/add', TaskController.addTask);
// 切换任务状态
router.post('/task/status', TaskController.updateTaskStatus);
// 更新任务
router.post('/task/update', TaskController.updateTask);
// 删除任务
router.get('/task/delete', TaskController.deleteTask);
// 添加任务评论
router.post('/task/comment/add', TaskController.addTaskComment);
// 获取任务评论
router.get('/task/comment', TaskController.getTaskComment);
// 获取我负责的所有任务
router.get('/task/myTask', TaskController.getMyTasks);


module.exports = router
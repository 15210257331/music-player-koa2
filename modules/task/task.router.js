const Router = require('koa-router')
const TaskController = require('./task.controller');
const config = require('../../utils/config');

const router = new Router({
    prefix: config.prefix
})

// 添加task
router.post('/task/add', TaskController.addTask);
// 查询task详情
router.get('/task/detail', TaskController.getTaskDetailById);
// 切换task状态
router.post('/task/status', TaskController.updateTaskStatus);
// 删除delete
router.get('/task/delete', TaskController.deleteTask);
// 添加任务评论
router.post('/task/comment/add', TaskController.addTaskComment);
// 获取任务评论
router.get('/task/comment', TaskController.getTaskComment);
// 获取我负责的任务
router.get('/task/myTask', TaskController.getMyTasks);



module.exports = router
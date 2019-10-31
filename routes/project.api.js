const Router = require('koa-router')
const ProjectController = require('../controllers/project');

const router = new Router({
    prefix: '/api'
})

/**
 * project api
 */
// project 列表
router.get('/project/list', ProjectController.getProjects);
// project 详情
router.get('/project/detail', ProjectController.getProjectDetail);
// 新增 project 
router.post('/project/add', ProjectController.newProject);
// 删除project
router.get('/project/delete', ProjectController.deleteProject);
// 获取project下的所有task
router.get('/project/task/list', ProjectController.deleteProject);



module.exports = router
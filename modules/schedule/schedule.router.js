const Router = require('koa-router')
const ScheduleController = require('./schedule.controller');
const config = require('../../utils/config');

const router = new Router({
    prefix: config.prefix
})

// 所有日程列表
router.get('/schedule/list', ScheduleController.getAllSchedule);
// 添加task
router.post('/schedule/add', ScheduleController.addSchedule);
// 删除delete
router.get('/schedule/delete', ScheduleController.deleteSchedule);

module.exports = router
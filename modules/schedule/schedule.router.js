const Router = require('koa-router')
const ScheduleController = require('./schedule.controller');
const config = require('../../common/config');

const router = new Router({ prefix: config.prefix });

// 获取所有日程
router.get('/schedule/list', ScheduleController.getAllSchedule);
// 添加日程
router.post('/schedule/add', ScheduleController.addSchedule);
// 删除日程
router.get('/schedule/delete', ScheduleController.deleteSchedule);

module.exports = router;
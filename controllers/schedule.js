const Schedule = require("../models/schedule.model");
const User = require('../models/user.model');
const events = require('events');
// const life = new events.EventEmitter();

class ScheduleController {

    // 查询所有日程 (查询当前用户参加的日程)
    static async getAllSchedule(ctx, next) {
        const userId = ctx.state.userInfo._id.toString(); // 需要把objectId对象转换成string
        try {
            const schedules = await Schedule.find({ "participant": { $elemMatch: { $eq: userId } } });
            const participant = schedules.map(item => User.find({ "_id": { $in: item.participant } }));
            const member = await Promise.all(participant);
            const organizer = schedules.map(item => User.findOne({ "_id": item.organizer }));
            const creater = await Promise.all(organizer);
            const res = schedules.map((item, i) => {
                return {
                    _id: item._id,
                    name: item.name,
                    content: item.content,
                    organizer: creater[i],
                    participant: member[i],
                    endTime: item.endTime,
                    startTime: item.startTime
                }
            })
            ctx.body = {
                code: 200,
                data: res,
                msg: '查询成功'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: [],
                msg: '服务器错误'
            }
        }
    }

    // 新建日程
    static async addSchedule(ctx, next) {
        let participant = ctx.request.body.participant;
        participant.unshift(ctx.state.userInfo._id.toString());
        const schedule = Object.assign({}, ctx.request.body, {
            organizer: ctx.state.userInfo._id.toString(),
            participant: participant
        })
        try {
            let doc = await Schedule.create(schedule);
            if (doc) {
                // life.emit('schedule', 'xx');
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '添加成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '任务添加失败',
                msg: err
            }
        }
    }

    // 删除日程
    static async deleteSchedule(ctx, next) {
        let scheduleId = ctx.request.query.id;
        try {
            let doc = await Schedule.deleteOne({ _id: taskId })
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: scheduleId,
                    msg: '删除成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '删除失败',
                msg: err
            }
        }
    }
}

module.exports = ScheduleController;
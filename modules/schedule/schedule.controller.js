const Schedule = require("./schedule.model");
const User = require('../user/user.model');
const events = require('events');
// const life = new events.EventEmitter();

class ScheduleController {

    // 查询所有日程 (查询当前用户参加的日程 且为当前时间之后的)
    static async getAllSchedule(ctx, next) {
        const userId = ctx.state.userInfo._id.toString(); // 需要把objectId对象转换成string
        try {
            const schedules = await Schedule.find({ "participant": { $elemMatch: { $eq: userId }}}).sort({ startTime: 1 });
            const participantPromise = schedules.map(item => User.find({ "_id": { $in: item.participant } }));
            const participant = await Promise.all(participantPromise);
            const organizerPromise = schedules.map(item => User.findOne({ "_id": item.organizer }));
            const organizer = await Promise.all(organizerPromise);
            const res = schedules.map((item, i) => {
                return {
                    _id: item._id,
                    name: item.name,
                    content: item.content,
                    organizer: organizer[i],
                    participant: participant[i],
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
        const schedule = Object.assign({}, ctx.request.body, {
            organizer: ctx.state.userInfo._id.toString(),
        })
        try {
            let doc = await Schedule.create(schedule);
            const participant = await User.find({ "_id": { $in: doc.participant } });
            const organizer = await User.findOne({ "_id": doc.organizer });
            const res = Object.assign({}, doc._doc, {
                participant: participant,
                organizer: organizer
            })
            ctx.body = {
                code: 200,
                data: res,
                msg: '添加成功！'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: 'fail',
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
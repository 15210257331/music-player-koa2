const Schedule = require("./schedule.model");
const User = require('../user/user.model');
const events = require('events');

class ScheduleController {

    // 查询当前用户参与的和创建的所有日程
    static async getAllSchedule(ctx, next) {
        const userId = ctx.state.userInfo._id;
        try {
            // $or 多条件或查询 后跟数组 每一项是满足的每一条条件
            const doc = await Schedule
                .find({ $or: [{ "participant": { $elemMatch: { $eq: userId } } }, { 'creator': userId }] })
                .populate('creator')
                .populate('participant')
                .sort({ startTime: 1 });
            ctx.body = {
                code: 200,
                data: doc,
                msg: '查询成功'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: [],
                msg: '查询成功'
            }
        }
    }

    // 新建日程
    static async addSchedule(ctx, next) {
        const requestBody = Object.assign({}, ctx.request.body, {
            creator: ctx.state.userInfo._id,
        })
        try {
            const schedule = await Schedule.create(requestBody);
            const doc = await Schedule
                .findOne({ "_id": schedule._id })
                .populate('creator')
                .populate('participant');
            ctx.body = {
                code: 200,
                data: doc,
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
            let doc = await Schedule.deleteOne({ _id: scheduleId });
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
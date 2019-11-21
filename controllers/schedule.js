const Schedule = require("../models/schedule.model");
const events = require('events');
// const life = new events.EventEmitter();

class ScheduleController {

    // 查询所有日程
    static async getAllSchedule(ctx, next) {
        let userInfo = ctx.state.userInfo;
        // 查询当前用户参加的日程
        try {
            let doc = await Schedule.find({}).sort({ update_at: -1 });
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: null,
                msg: err
            }
        }
    }

    // 新建日程
    static async addSchedule(ctx, next) {
        let participant = ctx.request.body.participant;
        participant.unshift(ctx.state.userInfo);
        const data = Object.assign({}, ctx.request.body, {
            organizer: ctx.state.userInfo,
            participant: participant
        })
        try {
            let doc = await Schedule.create(data);
            if (doc) {
                // life.emit('schedule', 'xx');
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '任务添加成功！'
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

    // 更新todo
    static async updateTodo(ctx, next) {
        let userId = ctx.state.userInfo._id;
        try {
            let doc = await Todo.findOneAndUpdate({
                userId: userId
            }, {
                    $set: {
                        title: ctx.request.body.title,
                        content: ctx.request.body.content,
                        remind: ctx.request.body.remind,
                        remark: ctx.request.body.remark,
                    }
                }, {
                    new: true
                })
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: '更新成功',
                    msg: '更新成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 200,
                data: '添加失败',
                msg: err
            }
        }
    }

    // 删除日程
    static async deleteSchedule(ctx, next) {
        let taskId = ctx.request.query.id;
        try {
            let doc = await Task.deleteOne({ _id: taskId })
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: taskId,
                    msg: '任务删除成功'
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
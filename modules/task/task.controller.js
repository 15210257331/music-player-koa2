const Task = require("./task.model");
const Comment = require("./comment.model");
const helper = require('../../common/helper');
const Project = require('../project/project.model');
class TaskController {

    // 新增任务
    static async addTask(ctx, next) {
        const data = Object.assign({}, ctx.request.body, {
            principal: ctx.state.userInfo._id,
            number: helper.generate8Code(6),
        })
        const projectId = ctx.request.body.projectId;
        try {
            const res = await Task.create(data);
            await Project.update({ _id: projectId }, { $push: { task: res._id } });
            const doc = await Task
                .findOne({ _id: res._id })
                .populate('principal')
                .populate('tag');
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '添加成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '添加失败',
                msg: err
            }
        }
    }

    // 切换任务状态
    static async updateTaskStatus(ctx, next) {
        const taskId = ctx.request.body._id;
        const status = ctx.request.body.status;
        try {
            const doc = await Task.updateOne({ _id: taskId }, { $set: { status: status } });
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
                data: '更新失败',
                msg: err
            }
        }
    }


    // 更新任务
    static async updateTask(ctx, next) {
        let taskId = ctx.state.userInfo._id;
        try {
            const doc = await Task.findOneAndUpdate({
                _id: taskId
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

    // 删除任务
    static async deleteTask(ctx, next) {
        let taskId = ctx.request.query.id;
        try {
            const doc = await Task.deleteOne({ _id: taskId })
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: taskId,
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

    // 为任务添加评论
    static async addTaskComment(ctx, next) {
        const data = Object.assign({}, ctx.request.body, {
            author: ctx.state.userInfo._id
        })
        try {
            const doc = await Comment.create(data);
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '添加成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '添加失败',
                msg: err
            }
        }
    }

    // 获取任务评论
    static async getTaskComment(ctx, next) {
        const taskId = ctx.request.query.taskId;
        try {
            // 连表查询按照time字段正序排列
            const doc = await Comment.find({ taskId: taskId }).populate('author').sort({ time: 1 });
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '获取评论成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '获取评论失败',
                msg: err
            }
        }
    }

    // 获取当前用户的所有任务
    static async getMyTasks(ctx, next) {
        const userId = ctx.state.userInfo._id;
        try {
            const doc = await Task
                .find({ principal: userId })
                .populate('tag')
                .populate('principal')
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
                data: 'fail',
                msg: err
            }
        }
    }
}

module.exports = TaskController;
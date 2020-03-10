const Task = require("./task.model");
const Comment = require("./comment.model");
const helper = require('../../utils/helper');
const User = require('../user/user.model');
const Tag = require('../tag/tag.model');

class TaskController {

    // 新增任务
    static async addTask(ctx, next) {
        const data = Object.assign({}, ctx.request.body, {
            principal: ctx.state.userInfo._id,
            number: helper.generate8Code(6),
        })
        try {
            let doc = await Task.create(data);
            const principal = await User.findOne({ "_id": doc.principal })
            const tag = await Tag.find({ "_id": { $in: doc.tag } });
            const res = Object.assign({}, doc._doc, {
                principal: principal,
                tag: tag
            })
            ctx.body = {
                code: 200,
                data: res,
                msg: '任务添加成功！'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '任务添加失败',
                msg: err
            }
        }
    }

    // 根据ID查询任务详情
    static async getTaskDetailById(ctx, next) {
        const taskId = ctx.request.query._id;
        try {
            let task = await Task.findOne({ '_id': taskId });
            const principal = await User.findOne({ "_id": task.principal })
            const tag = await Tag.find({ "_id": { $in: task.tag } });
            const res = Object.assign({}, task, {
                principal: principal,
                tag: tag
            })
            ctx.body = {
                code: 200,
                data: res,
                msg: 'success'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: 'fail',
                msg: err
            }
        }
    }

    // 切换任务状态
    static async updateTaskStatus(ctx, next) {
        let taskId = ctx.request.body._id;
        let status = ctx.request.body.status;
        try {
            let doc = await Task.findOneAndUpdate({
                _id: taskId
            }, {
                    $set: {
                        status: status,
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
                data: '更新失败',
                msg: err
            }
        }
    }


    // 更新任务
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

    // 删除任务
    static async deleteTask(ctx, next) {
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

    // 为任务添加评论
    static async addTaskComment(ctx, next) {
        const data = Object.assign({}, ctx.request.body, {
            commentTime: new Date(),
            commentAuthor: ctx.state.userInfo
        })
        try {
            let doc = await Comment.create(data)
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '添加评论成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '添加评论失败',
                msg: err
            }
        }
    }

    // 获取任务添评论
    static async getTaskComment(ctx, next) {
        const taskId = ctx.request.query.taskId;
        try {
            let doc = await Comment.find({ taskId: taskId })
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

    // 获取当前用户的任务
    static async getMyTasks(ctx, next) {
        const userId = ctx.state.userInfo._id;
        try {
            const tasks = await Task.find({ principal: userId });
            const principalPromise = tasks.map(item => User.findOne({ "_id": item.principal }));
            const principal = await Promise.all(principalPromise);
            const tagPromise = tasks.map(item => Tag.find({ "_id": { $in: item.tag } }));
            const tag = await Promise.all(tagPromise);
            tasks.map((item, i) => {
                item.principal = principal[i];
                item.tag = tag[i];
            })
            ctx.body = {
                code: 200,
                data: tasks,
                msg: 'success'
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
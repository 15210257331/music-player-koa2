const Task = require("../models/task.model");


class TaskController {

    // 查询所有的task
    static async getAllTask(ctx, next) {
        try {
            let doc = await Task.find({}).sort({ update_at: -1 });
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

    // 新增任务
    static async addTask(ctx, next) {
        let task = ctx.request.body;
        try {
            let doc = await Task.create(task);
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: '添加成功！',
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

    // 删除任务
    static async deleteTask(ctx, next) {
        let taskId = ctx.request.query.id;
        try {
            let doc = await Task.deleteOne({_id: taskId})
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: '删除成功',
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

module.exports = TaskController;
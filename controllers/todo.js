const Todo = require("../database/todo.model");


class TodoController {

    // 查询todo列表分页
    static async getTodoList(ctx, next) {
        let curPage = parseInt(ctx.request.query.curPage);
        let pageSize = parseInt(ctx.request.query.pageSize);
        try {
            let doc = await Todo.find({})
                .skip((curPage - 1) * pageSize)
                .limit(pageSize)
                .sort({ update_at: -1 });
            let total = await Todo.countDocuments();
            if (doc) {
                ctx.body = {
                    result: true,
                    code: 200,
                    data: {
                        list: doc,
                        total: total
                    },
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 9999,
                data: null,
                msg: err
            }
        }
    }

    // 查询所有todo
    static async getAllTodoList(ctx, next) {
        try {
            let doc = await Todo.find({}).sort({ update_at: -1 });
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

    // 查询项目下的任务列表
    static async getTaskListByProjectId(ctx, next) {
        let projectId = ctx.request.query.id;
        try {
            let doc = await Todo.find({
                projectId: projectId
            }).sort({ update_at: -1 });
            console.log(doc);
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

    // 新增todo
    static async addTodo(ctx, next) {
        let todo = Object.assign({}, ctx.request.body, {
            userId: ctx.state.userInfo._id,
            status: 1
        })
        try {
            let doc = await Todo.create(todo);
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

    // 切换todo状态
    static async changeStatus(ctx, next) {
        let _id = ctx.request.body._id;
        let status = ctx.request.body.status;
        try {
            let doc = await Todo.findOneAndUpdate({
                _id: _id
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

    // 删除todo
    static async deleteTodo(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Todo.deleteOne({
                _id: id
            })
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

module.exports = TodoController;
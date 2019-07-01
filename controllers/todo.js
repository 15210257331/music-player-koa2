const Todo = require("../database/todo.model");


class TodoController {

    // 查询todo列表
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
                    code: 10000,
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

    // 新增todo
    static async addTodo(ctx, next) {
        let todo = Object.assign({}, ctx.request.body, {
            userId: ctx.session.userInfo._id
        })
        try {
            let doc = await Todo.create(todo);
            if (doc) {
                ctx.body = {
                    code: 10000,
                    data: '添加成功！',
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 9999,
                data: '添加失败',
                msg: err
            }
        }
    }

    // 切换完成状态
    static async changeStatus(ctx, next) {
        let userId = ctx.session.userInfo._id;
        try {
            let doc = await Todo.findOneAndUpdate({
                userId: userId
            }, {
                    $set: {
                        status: ctx.request.body.status,
                    }
                }, {
                    new: true
                })
            if (doc) {
                ctx.body = {
                    code: 10000,
                    data: '更新成功',
                    msg: '更新成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 9999,
                data: '更新失败',
                msg: err
            }
        }
    }


    // 更新todo
    static async updateTodo(ctx, next) {
        let userId = ctx.session.userInfo._id;
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
                    code: 10000,
                    data: '更新成功',
                    msg: '更新成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 9999,
                data: '添加失败',
                msg: err
            }
        }
    }

    // 删除todo
    static async deleteTodo(ctx, next) {
        let id = ctx.request.query.id;

    }
}

module.exports = TodoController;
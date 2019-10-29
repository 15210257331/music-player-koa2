const Project = require("../models/project.model");


class ProjectController {

    // 查询所有项目
    static async getProjects(ctx, next) {
        try {
            let doc = await Project.find({}).sort({ update_at: -1 });
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

    // 新建项目
    static async newProject(ctx, next) {
        let project = Object.assign({}, ctx.request.body, {
            userId: ctx.state.userInfo._id,
        })
        try {
            let doc = await Project.create(project);
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

    // 删除project
    static async deleteProject(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Project.deleteOne({
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

module.exports = ProjectController;
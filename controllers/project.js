const Project = require("../models/project.model");
const Task = require("../models/task.model");

class ProjectController {

    // 查询所有项目
    static async getProjects(ctx, next) {
        let userId = ctx.state.userInfo._id;
        try {
            let doc = await Project.find({ userId: userId }).sort({ update_at: -1 });
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

    // 查询项目详情
    static async getProjectDetail(ctx, next) {
        let projectId = ctx.request.query._id;
        try {
            let project = await Project.find({ _id: projectId });
            let task = await Task.find({ projectId: projectId });
            if (project) {
                let doc = project[0];
                doc.task = task;
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '查询成功！'
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
                    data: doc,
                    msg: '添加项目成功！'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '添加项目失败',
                msg: err
            }
        }
    }

    // 删除project
    static async deleteProject(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Project.deleteOne({_id: id});
            let data = await Task.deleteMany({projectId: id});
            if (doc.ok === 1 && data.ok === 1) {
                ctx.body = {
                    code: 200,
                    data: id,
                    msg: '项目删除成功'
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
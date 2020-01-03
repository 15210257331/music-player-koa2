const Project = require("../models/project.model");
const Task = require("../models/task.model");
const User = require('../models/user.model');
const Tag = require('../models/tag.model');
class ProjectController {

    // 查询所有项目 (当前登录用户参与的项目可以按name搜索)
    static async getProjects(ctx, next) {
        const userId = ctx.state.userInfo._id.toString();
        const name = ctx.request.body.name;
        const reg = new RegExp(name, 'i');
        try {
            const projects = await Project.find({ "member": { $elemMatch: { $eq: userId } }, "name": { $regex: reg } });
            const membersPromise = projects.map(item => User.find({ "_id": { $in: item.member } }));
            const member = await Promise.all(membersPromise);
            const creatersPromise = projects.map(item => User.findOne({ "_id": item.creater }));
            const creater = await Promise.all(creatersPromise);
            const data = projects.map((item, i) => {
                return {
                    name: item.name,
                    content: item.content,
                    creater: creater[i],
                    member: member[i],
                    _id: item._id,
                    createDate: item.createDate
                }
            })
            ctx.body = {
                code: 200,
                data: data,
                msg: '项目列表查询成功'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: [],
                msg: '服务器错误'
            }
        }
    }

    // 查询项目详情
    static async getProjectDetail(ctx, next) {
        let projectId = ctx.request.query._id;
        try {
            const project = await Project.findOne({ _id: projectId });
            const members = await User.find({ "_id": { $in: project.member } });
            const creater = await User.findOne({ "_id": project.creater });
            const tasks = await Task.find({ projectId: projectId });
            const projectTag = await Tag.find({ projectId: projectId });
            const principalPromise = tasks.map(item => User.findOne({ "_id": item.principal }));
            const principal = await Promise.all(principalPromise);
            const tagPromise = tasks.map(item => Tag.find({ "_id": { $in: item.tag } }));
            const tag = await Promise.all(tagPromise);
            tasks.map((item, i) => {
                item.principal = principal[i];
                item.tag = tag[i];
            })
            const res = {
                name: project.name,
                content: project.content,
                creater: creater,
                member: members,
                _id: project._id,
                createDate: project.createDate,
                task: tasks,
                tag: projectTag
            };
            ctx.body = {
                code: 200,
                data: res,
                msg: '查询成功！'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: {},
                msg: '服务器错误'
            }
        }
    }

    // 新建项目
    static async newProject(ctx, next) {
        let member = ctx.request.body.member;
        member.unshift(ctx.state.userInfo._id.toString());
        const project = Object.assign({}, ctx.request.body, {
            creater: ctx.state.userInfo._id.toString(),
            createDate: new Date(),
            task: [],
            member: member
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
    // 更新项目
    static async updateProject(ctx, next) {
        const projectId = ctx.request.body.projectId;
        const update = Object.assign({}, ctx.request.body);
        delete update.projectId;
        try {
            const doc = await Project.findOneAndUpdate({ _id: projectId }, { $set: update }, { new: true });
            const member = await User.find({ "_id": { $in: doc.member } });
            if (doc) {
                console.log(doc);
                doc.member = member;
                ctx.body = {
                    code: 200,
                    data: doc,
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
    // 删除项目
    static async deleteProject(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Project.deleteOne({ _id: id });
            let data = await Task.deleteMany({ projectId: id });
            if (doc.ok === 1 && data.ok === 1) {
                ctx.body = {
                    code: 200,
                    data: id,
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
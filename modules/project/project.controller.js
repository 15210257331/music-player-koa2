const Project = require("./project.model");
const Task = require("../task/task.model");
const User = require('../user/user.model');
const Tag = require("./tag.model");
const Type = require("./type.model");
const config = require('../../common/config');
class ProjectController {
    // 查询当前用户参与的项目可以按name搜索,按时间倒序排列
    static async getProjects(ctx, next) {
        const userId = ctx.state.userInfo._id;
        const name = ctx.request.body.name;
        const reg = new RegExp(name, 'i');
        try {
            const doc = await Project
                .find({ "participant": { $elemMatch: { $eq: userId } }, "name": { $regex: reg } })
                .populate('creator')
                .sort({ 'createTime': -1 })
            ctx.body = {
                code: 200,
                data: doc,
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

    // 新建项目
    static async addProject(ctx, next) {
        let participant = ctx.request.body.participant;
        participant.unshift(ctx.state.userInfo._id);
        const project = Object.assign({}, ctx.request.body, {
            creator: ctx.state.userInfo._id,
            participant: participant,
            cover: `${config.host}:${config.port}/images/project-cover/cover-default.png`,
            task: [],
            tag: []
        })
        try {
            const res = await Project.create(project);
            const doc = await Project
                .findOne({ "_id": res._id })
                .populate('creator')
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

    // 上传项目封面
    static async uploadImg(ctx, next) {
        const projectCoverUrl = `${config.host}:${config.port}/images/project-cover/${ctx.req.file.filename}`;
        ctx.body = {
            code: 200,
            data: projectCoverUrl,
            msg: '图片上传成功'
        }
    }

    // 更新项目
    static async updateProject(ctx, next) {
        const projectId = ctx.request.body.projectId;
        const update = {
            name: ctx.request.body.name,
            content: ctx.request.body.content,
            cover: ctx.request.body.cover
        };
        try {
            const doc = await Project
                .findOneAndUpdate({ _id: projectId }, { $set: update }, { new: true })
                .populate('creator')
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '更新成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: '更新失败',
                msg: err
            }
        }
    }

    // 添加项目标签
    static async addProjectTag(ctx, next) {
        const insertData = {
            name: ctx.request.body.name,
            color: ctx.request.body.color
        }
        const projectId = ctx.request.body.projectId;
        try {
            const doc = await Tag.create(insertData);
            await Project.update({ _id: projectId }, { $push: { tag: doc._id } });
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

    // 添加项目类型
    static async addProjectType(ctx, next) {
        const insertData = {
            name: ctx.request.body.name,
        }
        const projectId = ctx.request.body.projectId;
        try {
            const doc = await Type.create(insertData);
            await Project.update({ _id: projectId }, { $push: { type: doc._id } });
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

    // 添加项目成员
    static async addProjectMemeber(ctx, next) {
        const projectId = ctx.request.body.projectId;
        const memberId = ctx.request.body.memberId;
        try {
            await Project.update({ _id: projectId }, { $push: { participant: memberId } });
            const doc = await User
                .findOne({ _id: memberId })
                .populate('role');
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
                data: '删除失败',
                msg: err
            }
        }
    }

    // 删除项目
    static async deleteProject(ctx, next) {
        let projectId = ctx.request.query.id;
        try {
            // 删除项目下的所有任务
            const taskIds = await Project.find({ _id: projectId }).task;
            await Task.deleteMany({ _id: { $in: taskIds } });
            // deleteOne返回删除document的数量
            const doc = await Project.deleteOne({ _id: projectId });
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: projectId,
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

    // 查询项目详情
    static async getProjectDetail(ctx, next) {
        let projectId = ctx.request.query._id;
        try {
            const doc = await Project
                .findOne({ _id: projectId })
                .populate("creator")
                .populate("participant")
                .populate("tag")
                .populate('type')
                .populate({
                    path: 'task',
                    options: { sort: { 'createTime': -1 } },
                    populate: { path: 'principal tag' },
                })
            ctx.body = {
                code: 200,
                data: doc,
                msg: '查询成功！'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                data: {},
                msg: '查询失败！'
            }
        }
    }
}

module.exports = ProjectController;
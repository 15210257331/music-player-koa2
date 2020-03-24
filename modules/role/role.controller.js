const Role = require('./role.model');
const config = require('../../common/config');


class RoleController {
    // 查询角色
    static async getRole(ctx, next) {
        const name = ctx.request.body.name;
        const reg = new RegExp(name, 'i');
        try {
            let doc = await Role.find({ "name": { $regex: reg } });
            if (doc) {
                ctx.body = {
                    code: 200,
                    data: doc,
                    msg: '成功'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                msg: '添加失败'
            }
        }
        await next();
    }

    // 添加角色
    static async addRole(ctx, next) {
        const data = ctx.request.body;
        try {
            let doc = await Role.create(data);
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
                token: null,
                msg: '添加失败'
            }
        }
        await next();
    }

    // 更新角色
    static async updateRole(ctx, next) {
        let _id = ctx.request.body.id;
        const updateData = {
            name: ctx.request.body.name,
            description: ctx.request.body.description,
        }
        try {
            let doc = await Role.findOneAndUpdate({ _id: _id }, { $set: updateData }, { new: true });
            ctx.body = {
                code: 200,
                data: doc,
                msg: '修改成功'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                err: '修改失败'
            }
        }
        await next();
    }

    // 角色关联权限
    static async setAuthority(ctx, next) {
        let _id = ctx.request.body.id;
        const updateData = {
            authority: ctx.request.body.authority,
        }
        try {
            let doc = await Role.findOneAndUpdate({ _id: _id }, { $set: updateData }, { new: true });
            ctx.body = {
                code: 200,
                data: doc,
                msg: '修改成功'
            }
        } catch (err) {
            ctx.body = {
                code: 999,
                err: '修改失败'
            }
        }
        await next();
    }

    // 删除角色
    static async deleteRole(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Role.deleteOne({ _id: id });
            if (doc) {
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
        await next();
    }
}

module.exports = RoleController;
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const http = require("http");
const Article = require("../database/article.model");


class ArticleController {

    // 新增文章
    static async addArticle(ctx, next) {
        let article = Object.assign({}, requestBody, {
            author: ctx.session.userInfo._id
        })
        try {
            let res = await User.Article(article);
            if (res) {
                ctx.body = {
                    code: 10000,
                    data: 'success'
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

    // 更新文章
    static async updateArticle() {

    }

    // 分页获取文章列表
    static async getArticle(ctx, next) {
        let curPage = parseInt(ctx.request.body.curPage);
        let pageSize = parseInt(ctx.request.body.pageSize);
        try {
            let doc = await Article.find({})
                .skip((curPage - 1) * pageSize)
                .limit(pageSize)
                .sort({ update_at: -1 });
            let total = await Article.countDocuments();
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
                msg: err
            }
        }
    }

    // 获取文章详情
    static async getArticleDetailById(ctx, next) {
        let id = ctx.request.query.id;
        try {
            let doc = await Article.findById(id);
            if (doc) {
                ctx.body = {
                    code: 10000,
                    data: doc,
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                code: 9999,
                msg: err
            }
        }
    }

    // 删除文章
    static async deleteArticle(ctx, next) {
        let id = ctx.request.query.id;
        
    }
}

module.exports = ArticleController;
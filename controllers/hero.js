const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const http = require("http");
const Hero = require("../models/hero.model");


class HeroController {
    // 分页获取英雄列表
    static async getHerosList(ctx, next) {
        let curPage = parseInt(ctx.request.body.curPage);
        let pageSize = parseInt(ctx.request.body.pageSize);
        try {
            let doc = await Hero.find({})
                .skip((curPage - 1) * pageSize)
                .limit(pageSize)
                .sort({ update_at: -1 });
            let total = await Hero.count();
            if (doc) {
                ctx.body = {
                    result: true,
                    data: {
                        list: doc,
                        total: total
                    },
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                result: false,
                msg: err
            }
        }
    }

    static async getHeroById(ctx, next) {
        let heroId = ctx.request.query.heroId;
        try {
            let doc = await Hero.findById(heroId);
            if (doc) {
                ctx.body = {
                    result: true,
                    data: doc,
                    msg: 'success'
                }
            }
        } catch (err) {
            ctx.body = {
                result: false,
                msg: err
            }
        }
    }
}

module.exports = HeroController;
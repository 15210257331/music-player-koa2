const request = require('../utils/httpRequest');

class MusicController {
    static async banner(ctx, next) {
        // let query = Object.assign({}, ctx.request.query, ctx.request.body, {
        //     cookie: ctx.cookies
        // })
        try {
            let doc = await request(
                'POST', `https://music.163.com/api/v2/banner/get`, {
                    clientType: "pc"
                }, {
                    crypto: 'linuxapi',
                    proxy: ctx.proxy
                }
            )
            ctx.body = {
                result: true,
                data: doc
            }
        } catch (err) {
            ctx.body = {
                result: false,
                err: err
            }
        }
    }
    static async search(ctx, next) {
        const data = {
            s: ctx.request.body.keywords,
            type: ctx.request.body.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
            limit: ctx.request.body.limit || 30,
            offset: ctx.request.body.offset || 0
        }
        try {
            let doc = await request('POST', `https://music.163.com/weapi/search/get`, data, {
                crypto: 'weapi',
                cookie: ctx.cookies,
                proxy: ctx.proxy
            })
            ctx.body = {
                result: true,
                data: doc
            }
        } catch (err) {
            ctx.body = {
                result: false,
                err: err
            }
        }
    }
    static async lyric(ctx, next) {
        let songId = ctx.request.query.id;
        try {
            let doc = await request('POST', `https://music.163.com/weapi/song/lyric?os=osx&id=${songId}&lv=-1&kv=-1&tv=-1`, {}, {
                crypto: 'weapi',
                cookie: ctx.cookies,
                proxy: ctx.proxy
            })
            ctx.body = {
                result: true,
                data: doc
            }
        } catch (err) {
            ctx.body = {
                result: false,
                err: err
            }
        }
    }
    static async url(ctx, next) {
        let songId = ctx.request.query.id;
        let br = ctx.request.query.br;
        if (!('MUSIC_U' in ctx.cookies)) {
            ctx.cookies._ntes_nuid = crypto.randomBytes(16).toString("hex")
        }
        const data = {
            ids: '[' + songId + ']',
            br: parseInt(br || 999000)
        }
        try {
            let doc = await request(
                'POST', `https://music.163.com/weapi/song/enhance/player/url`, data, {
                    crypto: 'weapi',
                    cookie: ctx.cookies,
                    proxy: ctx.proxy
                }
            )
            ctx.body = {
                result: true,
                data: doc
            }
        } catch (err) {
            ctx.body = {
                result: false,
                err: err
            }
        }
    }
    static async detail(ctx, next) {
        let ids = ctx.request.query.ids.split(/\s*,\s*/);
        const data = {
            c: '[' + ids.map(id => ('{"id":' + id + '}')).join(',') + ']',
            ids: '[' + ids.join(',') + ']'
        }
        try {
            let doc = await request(
                'POST', `https://music.163.com/weapi/v3/song/detail`, data, {
                    crypto: 'weapi',
                    cookie: ctx.cookies,
                    proxy: ctx.proxy
                }
            );
            ctx.body = {
                result: true,
                data: doc
            }
        } catch (err) {
            ctx.body = {
                result: false,
                err: err
            }
        }
    }
}

module.exports = MusicController
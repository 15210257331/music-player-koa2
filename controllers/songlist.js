const Songlist = require('../db/songlist.model');

class SonglistController {
  
  // 获取歌单列表
  static async getSonglist(ctx, next) {
    let userId = ctx.session.userInfo._id;
    try {
      let doc = await Songlist.findOne({_id: userId});
      if (doc) {
        ctx.body = {
          result: true,
          data: doc
        }
      }  
    } catch (err) {
        ctx.body = {
          result: false,
          errMessage: err
        }
    }
  }
  // 新建歌单
  static async newSonglist(ctx, next) {
    let songlistName = ctx.request.body.name;
  }
  
}

module.exports = SonglistController
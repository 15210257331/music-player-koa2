const Songlist = require('../db/songlist.model');

class SonglistController {
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

  static async newSonglist(ctx, next) {
    let songlistName = ctx.request.body.name;
  }
  
}

module.exports = SonglistController
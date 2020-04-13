const socket_io = require('socket.io');
const moment = require('moment');
const Message = require("../modules/message/message.model");
const schedule = require('node-schedule');
const setRemind = require('../modules/schedule/schedule.job');

// userId : socket  记录登录每个登录用户id和他对应的socket的集合
var users = {};

const socketio = (server) => {
    const io = socket_io.listen(server);
    // socket代表连接上socket的client实例
    io.sockets.on('connection', async (socket) => {
        // 日程提醒
        setRemind(socket);
        // 新登录用户 data 是用户ID  userId
        socket.on('new user', async (data) => {
            const keys = Object.keys(users);
            if (data && keys.indexOf(data) < 0) {
                users[data] = socket;
            }
            // const doc = await Message.find({ to: data, isReade: false });
            // if (doc.length > 0) {
            //     doc.map(item => {
            //         socket.emit('to' + item.to, item);
            //     })
            // }
            // console.log(Object.keys(users));
        })
        // 发送一对一消息  data.from 和 data.to 都是userId
        socket.on('private message', async (data) => {
            // 对方在线直接发送过去
            if (users[data.to]) {
                console.log('在线直接发送');
                await Message.create(data);
                users[data.to].emit('to' + data.to, data);
                // 如果不在线不发送存数据库等上线再发送
            } else {
               // await Message.create(msg);
            }
        })
        // 用户登出
        socket.on('disconnect', async (data) => {
            for (var i in users) {
                if (users[i].id === socket.id) {
                    delete users[i];
                }
            }
            // console.log(Object.keys(users));
        });
    })
};
module.exports = socketio;
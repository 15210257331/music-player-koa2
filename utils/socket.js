const socket_io = require('socket.io');
const Schedule = require("../models/schedule.model");
const moment = require('moment');


var socketio = {};

var interval;

var users = {}; // userId : socket  记录登录每个登录用户id和他对应的socket的集合

// 在socket对象上添加一个getSocketio的方法

socketio.getSocketio = function (server) {

    const io = socket_io.listen(server);

    io.sockets.on('connection', async (socket) => { // socket代表连接上socket的client实例
        // 设置日程提醒
        socket.on('setRemind', async (data) => {
            setRemind(socket, data);
        })
        // 新登录用户
        socket.on('new user', async (data) => { // data 是用户ID  userId
            users[data] = socket;
            console.log(Object.keys(users));
        })
        // 用户登出
        socket.on('disconnect', async (data) => {
            console.log('user' + socket.id + ' disconnected');
            delete users[data];
        });
        // 发送一对一消息
        socket.on('private message', async (data) => { // data.from 和 data.to 都是userId
            users[data.to].emit('to' + data.to, { from: data.from, to: data.to, msgType: '22', msg: data.msg });
        })
    })
};

var setRemind = async (socket, userId) => {
    if (interval) {
        clearInterval(interval)
    }
    let scheduleList = await Schedule.find({ "participant": { $elemMatch: { $eq: userId } }, startTime: { $gte: Number(moment().format('x')) } }).sort({ startTime: 1 });
    interval = setInterval(function () {
        scheduleList.map(item => {
            const scheduleRemindTime = Number(moment(item.startTime).format('X')) - 60 * 2;
            let now = Number(moment().format('X'));
            if (now === scheduleRemindTime) {
                socket.emit("remind", { data: `日程${item.name}于${moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}开始` }); // 向该客户端发送getMsg事件
            }
        })
    }, 1000);
}

module.exports = socketio;
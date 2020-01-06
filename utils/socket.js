const socket_io = require('socket.io');
const Schedule = require("../models/schedule.model");
const moment = require('moment');


var socketio = {};

var interval;

// 在socket对象上添加一个getSocketio的方法

socketio.getSocketio = function (server) {

    const io = socket_io.listen(server);

    io.sockets.on('connection', async (socket) => { // socket代表连接上socket的client实例
        socket.on('setRemind', async (data) => {
            setRemind(socket, data.userId);
        })
        socket.emit('getMsg', '我是socket推送过来的数据');
    })
};

var setRemind = async (socket, userId) => {
    if (interval) {
        clearInterval(interval)
    }
    // { "participant": { $elemMatch: { $eq: userId } } }
    let scheduleList = await Schedule.find().sort({ startTime: 1 });
    console.log(scheduleList);
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
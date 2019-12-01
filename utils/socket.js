const socket_io = require('socket.io');
const Schedule = require("../models/schedule.model");



var socketio = {};

// 在socket对象上添加一个getSocketio的方法

socketio.getSocketio = function (server) {

    const io = socket_io.listen(server);

    io.sockets.on('connection', async (socket) => { // socket代表连接上socket的client实例
        // console.log(socket);
        let scheduleList = await Schedule.find({}).sort({ update_at: -1 });
        setInterval(function () {
            scheduleList.map(item => {
                const scheduleStartTime = Date.parse(new Date(item.startTime)); // 精确到秒的时间戳
                const remindTime = Date.parse(new Date()) + (1000 * 60 * 5);
                if (scheduleStartTime === remindTime) {
                    socket.emit("remind", { data: `日程${item.name}于${new Date(item.startTime).toLocaleString()}开始` }); // 向该客户端发送getMsg事件
                }
            })
        }, 1000);


        socket.emit('getMsg', '我是来自socket的数据');

    })
};

module.exports = socketio;
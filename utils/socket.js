const socket_io = require('socket.io');

var socketio = {};

// 在socket对象上添加一个getSocketio的方法

socketio.getSocketio = function (server) {

    var io = socket_io.listen(server);
    
    var i = 100;
    
    io.sockets.on('connection', function (socket) { // socket 代表连接上socket的client实例

        console.log('socket连接成功');
        setInterval(function(){
            socket.emit("getMsg", i++); // 向该客户端发送getMsg事件
        }, 1000)
        

        socket.on('event01', function () { // 处理来自客户端的’event01’事件

            console.log('接受到了来自客户端的event01事件的消息');

            var datas = [1, 2, 3, 4, 5];

            socket.emit('event02', {
                datas: datas
            }); // 给该客户端发送event02事件

            socket.broadcast.emit('event02', {
                datas: datas
            }); // 发送给所有客户端

        })
    })
};

module.exports = socketio;
const Schedule = require("./schedule.model");
const moment = require('moment');
const schedule = require('node-schedule');

// 设置日程提醒
const setRemind = async (socket) => {
    socket.on('setRemind', async (userId) => {
        const doc = await Schedule
            .find({ "participant": { $elemMatch: { $eq: userId } }, startTime: { $gte: Number(moment().format('x')) } })
            .sort({ startTime: 1 });
        // 每一分钟执行一次定时任务
        schedule.scheduleJob('* 1 * * * *', () => {
            doc.map(item => {
                const scheduleRemindTime = Number(moment(item.startTime).format('X')) - 60 * 5;
                let now = Number(moment().format('X'));
                if (now === scheduleRemindTime) {
                    // 向该客户端发送remind事件
                    socket.emit("remind", { data: `日程${item.name}于${moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}开始` });
                }
            })
        });
    })
}

module.exports = setRemind;
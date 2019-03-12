const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static');
const timeLog = require('./middleware/timeLog');
const router = require('koa-router')();
const fs = require('fs')
const path = require('path')
const session = require('koa-session')

// error handler
onerror(app)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(logger())

app.use(static(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 配置session
app.keys = ['some secret hurr'];   /*cookie的签名*/
const CONFIG = {
    key: 'koa:sess', /** 默认 */
    maxAge: 30*60*1000,  /*  cookie的过期时间30分钟 */
    overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true, /**  true表示只有服务器端可以获取cookie */
    signed: true, /** 默认 签名 */
    rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
};
app.use(session(CONFIG, app));

// 自定义中间件
app.use(timeLog())

app.use(router.routes());

app.use(router.allowedMethods());

// 注册路由
fs.readdirSync(path.join(__dirname, 'routes')).forEach(item => {
  if(!(/\.js$/i.test(item))) {
    fs.readdirSync(path.join(__dirname,'routes/' + item)).forEach(sonItem => {
      let routeUrl = `/api/${item}/${sonItem.replace(/\.js$/i, '')}`;
      let routerControll = require(`./routes/${item}/${sonItem}`);
      router.use(routeUrl, routerControll.routes());
    })
  } else {
    let routeUrl = `/api/${item.replace(/\.js$/i, '')}`
    let routerControll = require(`./routes/${item}`);
    router.use(routeUrl, routerControll.routes());
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

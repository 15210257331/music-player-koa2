const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static');
const timeLog = require('./middleware/timeLog');
const checkToken = require('./middleware/checkToken');
const cors = require('koa2-cors');
const routerConfig = require('./routes/index');

// error handler
onerror(app)

app.use(json())

app.use(cors());

app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))

app.use(static(__dirname + '/public'))

app.use(views(__dirname + '/public/views', {
  extension: 'ejs'
}))

// 自定义中间件
app.use(timeLog());
app.use(checkToken());

// 注册路由
app.use(routerConfig.routes(), routerConfig.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
const Koa = require('koa');
const path = require('path');
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const static = require('koa-static');
const cors = require('koa2-cors');

const timeLog = require('./middleware/timeLog');
const checkToken = require('./middleware/checkToken');
const helper = require('./utils/helper');


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
helper.walk(path.join(__dirname, 'routes'), app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
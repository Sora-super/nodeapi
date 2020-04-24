/*
 * @Author: zhaoxing.xue
 * @Date: 2019-07-04 15:03:06
 * @LastEditors: zhaoxing.xue
 * @LastEditTime: 2019-07-10 15:58:29
 */
// app.js
// 加载依赖
const koa = require('koa');
var cors = require('koa2-cors');

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router');

const app = new koa();

// 首页
const index = router.get('/', ctx => {
    ctx.response.body = 'hello world';
}).routes();

app.use(index);
app.use(cors());
app.use(bodyParser());
app.use(apiRouter.routes());

app.listen(8081);

/*
 * @Author: zhaoxing.xue
 * @Date: 2019-07-04 15:02:42
 * @LastEditors: zhaoxing.xue
 * @LastEditTime: 2019-07-04 15:14:46
 */
// 加载依赖
const Router = require('koa-router');
const userController = require('../controllers/users/UserController');

const router = new Router({
  prefix: '/user'
});

//用户注册
router.post('/regist',userController.create)

//密码登陆
router.post('/login',userController.login)

//获取用户信息
router.post('/getUserInfo',userController.getUserInfo)

module.exports = router;

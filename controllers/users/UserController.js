//引入db配置
const db = require('../../config/db')
// const jwt = require('jsonwebtoken')
// const tools = require('../public/tool')
// const expireTime = '10s'

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import('../../module/user')
//自动创建表
user.sync({ force: false }); 

//数据库操作类
class userModule {
    static async userRegist(data) {
        return await user.create({
            password: data.password,
            username: data.username
        })
    }

    static async getUserInfo(username) {
        return await user.findOne({
            where: {
              username
            }
        })
    }
}

// 功能处理

class userController {
  //注册用户
  static async create(ctx) {
    const req = ctx.request.body;
    if (req.username && req.password) {
        try {
            const query = await userModule.getUserInfo(req.username);
            if (query) {
                ctx.response.status = 200;
                ctx.body = {
                    code: -1,
                    desc: '用户已存在'
                }
            } else {
                const param = {
                    password: req.password,
                    username: req.username
                }
                const data = await userModule.userRegist(param);

                ctx.response.status = 200;
                ctx.body = {
                    code: 0,
                    desc: '用户注册成功',
                    userInfo: {
                        username: req.username
                    }
                }
            }

        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: '参数不齐全'
            }
        }
    } else {
      return ctx.body = {
        code: '-1',
        desc: '用户名或密码不能为空'
      }
    }
  }

  //密码登陆
  static async login(ctx) {
    const req = ctx.request.body;
    if (!req.username || !req.password) {
        return ctx.body = {
            code: '-1',
            desc: '用户名或密码不能为空'
        }
    } else {
        const data = await userModule.getUserInfo(req.username);
        if (data) {
            if (data.password === req.passWord) {
                const info = {
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    username: data.username
                }
                return ctx.body = {
                    code: '0',
                    token: token,
                    userInfo: JSON.stringify(info),
                    desc: '登陆成功'
                }
            } else {
                return ctx.body = {
                    code: '-1',
                    desc: '用户密码错误'
                }
            }
        } else {
            return ctx.body = {
                code: '-1',
                desc: '该用户尚未注册'
            }
        }
    };
  }

  //获取用户信息(除密码外)
  static async getUserInfo(ctx){
    const req = ctx.request.body;
    // const token = ctx.headers.authorization;
        try {
            const result = await tools.verToken(token);
            if (!req.username) {
                return ctx.body = {
                    code: '-1',
                    desc: '参数错误'
                }
            } else {
                let data = await userModule.getUserInfo(req.username);
                if (req.username == data.username) {
                    const info = {
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        username: data.username
                    };
                    return ctx.body = {
                        code: '0',
                        userInfo: JSON.stringify(info),
                        desc: '获取用户信息成功'
                    }
                }
            }
        } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
  }
}

module.exports = userController
/*
* 用户中间件
* */

const User = require('../model/user');

module.exports = {
    /**
     * 最后一次登陆时间获取
     * */
    lastLoginTime: (req,res,next) => {
        User.lastLoginTime().then(result => {
            req.lastLoginTime = result;
            next();
        }).catch(err => {
            next(err);
        })
    }
}

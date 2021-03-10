/**
 *  登录子路由
 * */

const express = require('express');

const User = require('../model/user')
const log = require('../middleware/log')


const loginApp = express();



loginApp.get('/',(req,res)=>{
    res.render('login',{msg: ''});
})

loginApp.post('/',(req,res,next) => {
    let {username , password} = req.body;
    User.login(username,password).then(result => {
        if(result){
            //session储存
            req.session.user = result
            res.redirect('/');

            //    写日志
            let time = new Date();

            console.log(req.ip)

            req.log = {
                time,
                handle: '登录',
                ip: req.ip === '::1' ? '127.0.0.1' : req.ip
            }
            log.add(req,res,next);
        }else {
            res.render('login',{msg:"登录失败，用户名或者密码错误"})
        }

    }).catch(err => {
        next(err)
    })
})


module.exports = loginApp;
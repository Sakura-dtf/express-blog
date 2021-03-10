/**
 *  用户子路由
 * */

const express = require('express');

const User = require('../model/user')



const userApp = express();

userApp.get('/',(req,res) => {
    req.session.user = null;
    res.render('login',{msg:'退出成功'})
})


module.exports = userApp;
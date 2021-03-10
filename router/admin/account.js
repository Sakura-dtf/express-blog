/**
 * 后台账号子路由
 * */

const express = require('express');

const accountApp = express();

accountApp.get('/',(req,res,next) => {
    res.render('admin/account/index',{user:req.user})
})



module.exports = accountApp;

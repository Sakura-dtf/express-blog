/*
* 首页路由
* */

const express = require('express');

const indexApp = express();
const article = require('../middleware/article');
const category = require('../middleware/category');
const  auth = require('../middleware/auth');

indexApp.use(auth.getUser);

/*
* 加载首页中间件
* */

indexApp.get('/',[article.getHot,article.getList,category.getList],(req,res)=>{
    let {hots,articles,categories,user} = req;
    res.render('index',{hots: hots,articles: articles,categories: categories,user});
})

module.exports = indexApp;
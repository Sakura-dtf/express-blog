/**
 * 搜索子路由
 * */

const express = require('express');
const article = require('../middleware/article');

const category = require('../middleware/category');

const auth = require('../middleware/auth');

const searchApp = express();

searchApp.use(auth.getUser)

searchApp.get('/',[article.getListByKeyword,category.getList],(req,res)=>{
    let {articles,categories,user} = req;
    res.render('search',{articles,categories,keyword: req.query.keyword,user})
})


module.exports = searchApp;
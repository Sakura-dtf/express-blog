/**
 * 文章子路由
 * */

const express = require('express');
const article = require('../middleware/article');

const category = require('../middleware/category');

const articleApp = express();


const  auth = require('../middleware/auth');

articleApp.use(auth.getUser);

articleApp.use(category.getList);

articleApp.get('/list/:id',[category.getList,article.getListByCategoryId,category.getNumById],(req,res)=>{
    let {articles,categories,category,user} = req;
    res.render('list',{articles,categories,category,user});
})


//文章详情页

articleApp.get('/:id',[article.getArticleById,article.getTabByArticleId,article.getPrev,article.getNext],(req,res)=>{
    let {categories,article,tabs,prev,next,user} = req;
    res.render('article',{categories,article:article,tabs,prev,next,user});
})

module.exports = articleApp;
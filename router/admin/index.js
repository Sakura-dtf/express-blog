/**
* 后台首页子路由
 * */

const express = require('express');

const user = require('../../middleware/user');
const category = require('../../middleware/category');
const pv = require('../../middleware/pv');
const article = require('../../middleware/article');


const indexApp = express();

/**
 * 加载首页
 * */
indexApp.get('/',[user.lastLoginTime,category.getCount,article.getCount,pv.getTotal],(req,res) => {
    let {user,lastLoginTime,pvTotal,articleCount,categoryCount} = req;
    res.render('admin/index',{user,lastLoginTime,pvTotal,articleCount,categoryCount});
})

/**
 * 访问量接口
 * */

indexApp.get('/pvs',[pv.getAll],(req,res,next)=>{
    let {pvs} = req;
    let data= {};
    data.data = pvs;
    data.start = pvs[0].time;
    data.end = pvs[pvs.length-1].time;
    res.json(data);
})

module.exports = indexApp;

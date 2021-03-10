/**
 * 后台leim子路由
 * */

const express = require('express');

const category = require('../../middleware/category');

const categoryApp = express();

categoryApp.get('/',[category.getList],(req,res,next) => {
    let {user, categories} = req;
    res.render('admin/category/index',{user, categories})
})


categoryApp.post('/add',[category.add],(req,res) => {
    if(req.insertId){
        res.json({
            code:1,
            msg:'添加成功'
        })
    }else {
        res.json({
            code:2,
            msg:'添加失败'
        })
    }
})

categoryApp.get('/del',[category.del],(req,res) => {
    if(req.affectedRows > 0){
        res.json({
            code:1,
            msg:'删除成功',
        })
    }else {
        res.json({
            code:0,
            msg:'删除失败',
        })
    }
})

categoryApp.post('/setName',category.setName,(req,res)=>{
    if(req.affectedRows > 0){
        res.json({
            code:1,
            msg:'修改成功',
        })
    }else {
        res.json({
            code:0,
            msg:'修改失败',
        })
    }
})


categoryApp.post('/setIndex',category.setIndex,(req,res)=>{
    if(req.affectedRows > 0){
        res.json({
            code:1,
            msg:'修改成功',
        })
    }else {
        res.json({
            code:0,
            msg:'修改失败',
        })
    }
})

module.exports = categoryApp;

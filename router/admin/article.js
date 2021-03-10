/**
 * 后台文章子路由
 * */

const express = require('express');

const article = require('../../middleware/article')
const category = require('../../middleware/category')

const articleApp = express();



articleApp.get('/',[article.getCount],(req,res,next) => {
    let {user,pageList,articleCount} = req;
    let size = 5 //每页显示条数
    req.page = {};
    req.page.count = articleCount;
    req.page.list = pageList;
    req.page.p = req.query.p ? req.query.p : 1 ;
    req.page.p = parseInt(req.page.p);
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p;
    req.page.p = req.page.p < 1 ? 1 : req.page.p;
    req.page.total = Math.ceil(req.page.count/size);

    res.start = (req.page.p -1) * size;
    res.size = size;

    next();
},[article.getPage,category.getList],(req,res,next) => {
    let {user,pageList,articleCount,page,categories} = req;
    let {category_id, hot} = req.query;
    req.page.list = pageList;
    res.render('admin/article/index',{user,page,categories,category_id, hot})
})

/*
* 设置热门*/

articleApp.get('/setHot', article.setHot, (req,res) => {
    if(req.affectedRows > 0){
        res.json({
            code: 1,
            msg: "设置成功"
        })
    }else {
        res.json({
            code: 0,
            msg: "设置失败"
        })
    }
})

/*
* 添加博文
* */

articleApp.get('/add',category.getList,(req,res) => {
    let {user, categories} = req;
    res.render('admin/article/add',{user, categories,code:''});
})

//添加文章


articleApp.post('/add',[article.add,category.getList],(req,res) => {
    console.log(req.body);
    let {user, categories} = req;
    if(req.insertId){
        res.render('admin/article/add',{
            code: 1,
            user,
            categories
        })
    }else {
        res.render('admin/article/add',{
            code: 0,
            user,
            categories
        })
    }

})

/*editor上传*/
articleApp.post('/upload',(req,res) => {
    if(req.uploadUrl){
        res.json({
            uploaded: true,
            url: req.uploadUrl
        })
    }else {
        res.json({
            uploaded: false,
            err: {
                msg: "上传失败"
            }
        })
    }
})


/*
* editor中的图片设置
* */

articleApp.get('/del',article.del,(req,res) => {
    if(req.affectedRows > 0){
        res.json({
            code: 1,
            msg: "删除成功"
        })
    }else {
        res.json({
            code: 0,
            msg: "删除失败"
        })
    }
})

/*
* 获取编辑文章详细内容
* */

articleApp.get('/edit/:id',[category.getList,article.getArticleById],(req,res) => {
    let {user, categories, article} = req;
    res.render('admin/article/edit',{user, categories, article})
})



articleApp.post('/edit',[article.edit],(req,res) => {
    if(req.affectedRows > 0){
        res.render('admin/alert',{code:true,msg:'修改成功'})
    }else {
        res.render('admin/alert',{code:false,msg:'修改失败'})
    }


})


module.exports = articleApp;

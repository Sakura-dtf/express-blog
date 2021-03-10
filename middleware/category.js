/**
 * 文章类目中间件
 * */

const Category = require('../model/category')

module.exports = {

    /**
     * 获取类目下的文章列表
     * */
    getList: (req , res , next) => {
        Category.getList().then(result => {
            req.categories = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取类目编号
     * */
    getNumById: (req , res , next) => {
        let id = req.params.id;
        Category.getNumById(id).then(result => {
            req.category = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取总类目数
     * */


    getCount: (req,res,next)=>{
       Category.getCount().then(result => {
            req.categoryCount = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 新增类目
     * */


    add: (req,res,next)=>{
        let {name,index} = req.body;
        Category.add(name,index).then(result => {
            req.insertId = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 删除类目
     * */


    del: (req,res,next)=>{
        let {id} = req.query;
        Category.del(id).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 修改类目名称
     * */


    setName: (req,res,next)=>{
        let {id,name} = req.body;
        Category.setName(id,name).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 修改类目索引
     * */


    setIndex: (req,res,next)=>{
        let {id,index} = req.body;
        Category.setIndex(id,index).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


}
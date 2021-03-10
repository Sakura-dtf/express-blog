/**
 * 日志中间件
 * */

const Log = require('../model/log');


module.exports = {
    /**
     * 获取总访问量
     * */


    getPage: (req,res,next)=>{
        let size = req.page.size;
        let start = (req.page.p-1) * size;
        Log.getPage(start,size).then(result => {
            req.logs = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 获取总日志量
     * */


    getCount: (req,res,next)=>{
        Log.getCount().then(result => {
            req.count = result;
            next();
        }).catch(err => {
            next(err);
        })
    },



    /**
     * 新增日志
     * */


    add: (req,res,next)=>{
        console.log(req.log);
        Log.add(req.log).then(result => {
            req.count = result;
            next();
        }).catch(err => {
            next(err);
        })
    }

}
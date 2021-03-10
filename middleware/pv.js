/**
 * 访问量中间件
 * */

const Category = require('../model/category')
const Pv = require('../model/pv');


module.exports = {
    /**
     * 获取总访问量
     * */


    getTotal: (req,res,next)=>{
        Pv.getTotal().then(result => {
            req.pvTotal = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 获取全部访问量
     * */


    getAll: (req,res,next)=>{
        Pv.getAll().then(result => {
            req.pvs = result;
            next();
        }).catch(err => {
            next(err);
        })
    }

}
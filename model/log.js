/*
* 日志模型
* */

module.exports = class Log extends require('./model'){
    /**
     * 获取日志列表
     * */

    static getPage(start,size){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT handle,`time`,ip FROM `log` ORDER BY `time` DESC LIMIT ?,?'
            console.log(start,size);
            this.query(sql,[start,size]).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取日志列表失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取日志总条数
     * */

    static getCount(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) as count FROM `log`'
            this.query(sql).then(result=>{
                resolve(result[0].count);
            }).catch(err=>{
                console.log(`获取日志总条数失败： ${err.message}`);
                reject(err);
            })
        })
    }



    /**
     * 新增日志条数
     * @param {Object} log
     * */

    static add(log){
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `log` SET ?'
            this.query(sql,log).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`新增日志失败： ${err.message}`);
                reject(err);
            })
        })
    }

}
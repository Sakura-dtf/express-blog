/**
* 访问量模型
 * */

module.exports = class pv extends require('./model'){
    /**
     * 获取总访问量
     * */

    static getTotal() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT SUM(hits) AS total FROM pv'
            this.query(sql).then(result=>{
                resolve(result[0].total);
            }).catch(err=>{
                console.log(`获取总访问量： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取全部访问量
     * */

    static getAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `time`,hits FROM pv ORDER BY `time` ASC'
            this.query(sql).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取全部访问量： ${err.message}`);
                reject(err);
            })
        })
    }

}


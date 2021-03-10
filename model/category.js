/**
 * 文章类目数据模型
 * */


module.exports = class Category extends require('./model'){

    /**
     * 获取文章类目列表
     */

    static getList(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,`index` FROM category\tORDER BY `index` DESC'
            this.query(sql).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取文章类目列表失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取文章类目编号详情
     * @param{int} id 类目编号
     */

    static getNumById(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,`index` FROM category WHERE id = ?'
            this.query(sql,id).then(result=>{
                resolve(result[0]);
            }).catch(err=>{
                console.log(`获取文章类目列表编号失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取总类目数
     * */

    static getCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM category'
            this.query(sql).then(result=>{
                resolve(result[0].count);
            }).catch(err=>{
                console.log(`获取总类目数失败： ${err.message}`);
                reject(err);
            })
        })
    }



    /**
     * 新增类目
     * */

    static add(name,index) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO category (`name`,`index` ) VALUES (?,?)'
            this.query(sql,[name,index]).then(result=>{
                resolve(result.insertId);
            }).catch(err=>{
                console.log(`新增类目失败： ${err.message}`);
                reject(err);
            })
        })
    }




    /**
     * 删除类目
     * */

    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM category WHERE id = ?'
            this.query(sql,id).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`删除类目失败： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 修改类目名称
     * */

    static setName(id,name) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET `name` = ? WHERE id = ?'
            this.query(sql,[name,id]).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`修改类目名称失败： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 修改类目索引
     * */

    static setIndex(id,index) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET `index` = ? WHERE id = ?'
            this.query(sql,[index,id]).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`修改类目索引失败： ${err.message}`);
                reject(err);
            })
        })
    }

}


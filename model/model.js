const mysql = require('mysql');

/*
* 数据模型的基类
* 封装数据库操纵
* */

class Model {
    //连接对象
    /*static conn = null;*/

    /*
    * 数据库连接方法
    * */

    static connection(){
        Model.conn = mysql.createConnection({
            host: '',
            user: '',
            password: '',
            database: ''
        })
        Model.conn.connect(err => {
            if(err){
                console.log(`数据库连接失败：${err.message}`)
            }
        })
        Model.conn.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log("MySQL重连")
                Model.connection();
            } else {
                throw err;
            }
        });
    }

    /*
    * 关闭数据库操作
    * */

    static end() {
        if(null != Model.conn){
            Model.conn.end()
        }
    }

    /**
    * @param{string} sql 执行的sql语句
     * @param{Array} params 执行参数
    * */


    static  query(sql,params=[]){
        return new Promise((resolve,reject) =>{
            this.connection();

            Model.conn.query(sql,params,(err,results)=>{
                if(err){
                    reject(err);
                }else {
                    resolve(results);
                }
            })
        } )
    }


}
module.exports = Model;

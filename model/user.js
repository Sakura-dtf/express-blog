/**
 * 用户数据模型
 * */


module.exports = class User extends require('./model'){

    /**
     * @param {string} username 用户名
     * @param {string} password 密码
     * */
    static login(username,password){
        return new Promise((resolve, reject) => {
            let sql = 'select id,username from `user` where username = ? and password = ?';
            this.query(sql,[username,password]).then(result=>{
                resolve(result[0]);
            }).catch(err => {
                console.log("登录失败："+err.message);
                reject(err);
            })
        })
    }

    /**
     * 最后一次用户登录时间*/
    static lastLoginTime(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT `time` FROM `log` WHERE handle = \'登录\' ORDER BY `time` DESC LIMIT 1';
            this.query(sql).then(result=>{
                resolve(result[0].time);
            }).catch(err => {
                console.log("登录失败："+err.message);
                reject(err);
            })
        })
    }

}

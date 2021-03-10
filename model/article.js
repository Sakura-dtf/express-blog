/*
* 文章数据模型
* */

module.exports = class Article extends require('./model'){
    /**
     * 获取热门文章
     * @param{int} num 数量
     */
    static getHot(num){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article WHERE hot = 1 LIMIT ?'
            this.query(sql,num).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取热门推荐文章失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取文章列表
     */
    static getList(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article ORDER BY TIME DESC'
            this.query(sql).then(result=>{
                resolve(result);

            }).catch(err=>{
                console.log(`获取文章列表失败： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 获去类目下的文章列表
     * @param{int} id 类目编号
     */
    static getListByCategoryId(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE category_id = ? ORDER BY TIME DESC'
            this.query(sql,id).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取文章类目下列表失败： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 获取指定关键词的文章列表
     * @param{string} keyword 关键字
     */
    static getListByKeyword(keyword){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time` FROM article WHERE title LIKE ? ORDER BY TIME DESC'
            this.query(sql,`%${keyword}%`).then(result=>{
                resolve(result);

            }).catch(err=>{
                console.log(`获取指定关键词的文章列表失败： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 获取指定id的文章详情
     * @param{int} id 指定文字的id
     */
    static getArticleById(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT a.id,a.title,a.content,a.`time`,a.hits,a.category_id,c.name,a.thumbnail,a.hot \n' +
                'FROM article a,category c \n' +
                'WHERE a.id = ? AND a.`category_id` = c.id\n'
            this.query(sql,id).then(result=>{
                resolve(result[0]);

            }).catch(err=>{
                console.log(`获取指定id的文章详情失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取上一篇文章
     * @param{int} id 指定文字的id
     */
    static getPrevArticle(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title FROM article WHERE id < ? ORDER BY id DESC LIMIT 1'
            this.query(sql,id).then(result=>{
                resolve(result[0]);

            }).catch(err=>{
                console.log(`获取上一篇文章文章详情失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取下一篇文章
     * @param{int} id 指定文字的id
     */
    static getNextArticle(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title FROM article WHERE id > ? ORDER BY id ASC LIMIT 1'
            this.query(sql,id).then(result=>{
                resolve(result[0]);

            }).catch(err=>{
                console.log(`获取下一篇文章文章详情失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取总博文数
     * */

    static getCount(category_id,hot) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM article WHERE 1=1 ';
            sql += category_id != -1 && category_id ? ` AND category_id = ${category_id}` : '';
            sql += hot != -1 && hot ? ` AND hot = ${hot}` : '' ;

            this.query(sql).then(result=>{
                resolve(result[0].count);
            }).catch(err=>{
                console.log(`获取总博文数失败： ${err.message}`);
                reject(err);
            })
        })
    }



    /**
     * 获取指定页文章列表
     * @param{int} start 起始位置
     * @param{int} size  查询条数
     * @param{int} category_id 类目id
     * @param{int} hot 是否热门
     */
    static getPage(start,size,category_id,hot){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,thumbnail,hot FROM article WHERE 1 = 1'
            sql += category_id != -1 && category_id ? ` AND category_id = ${category_id}` : '';
            sql += hot != -1 && hot ? ` AND hot = ${hot}` : '' ;
            sql += ' ORDER BY `time` DESC LIMIT ? , ?';
            this.query(sql,[start,size]).then(result=>{
                resolve(result);

            }).catch(err=>{
                console.log(`获取指定页文章失败： ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 设置是否热门
     * @param{int} id 文章id
     * @param{int} hot 文章热门状态
     */
    static setHot(id,hot){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET hot = ? WHERE id = ?'
            this.query(sql,[hot,id]).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`设置热门状态： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 添加文章
     * @param{Object} article 文字对象
     */
    static add(article){
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO article SET ?'
            console.log(article)
            this.query(sql,article).then(result=>{
                resolve(result.insertId);
            }).catch(err=>{
                console.log(`添加文章： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 删除文章
     * @param{int} id 文章id
     */
    static del(id){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM article WHERE id = ?'
            this.query(sql,id).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`删除文章： ${err.message}`);
                reject(err);
            })
        })
    }


    /**
     * 编辑文章文章
     * @param{Object} article 文章id
     */
    static edit(article){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET title = ?, content = ?, hot = ?, category_id = ?, thumbnail = ? WHERE id = ?'
            this.query(sql,[article.title,article.content,article.hot,article.category_id,article.thumbnail,article.id]).then(result=>{
                resolve(result.affectedRows);
            }).catch(err=>{
                console.log(`编辑文章： ${err.message}`);
                reject(err);
            })
        })
    }



}
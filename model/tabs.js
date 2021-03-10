
/**
 * 标签数据模型
 * */

module.exports = class Tabs extends require('./model'){
    /**
     * 获取标签列表
     * */

    static getTabByArticleId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name` FROM tabs WHERE article_id = ?'
            this.query(sql,id).then(result=>{
                resolve(result);
            }).catch(err=>{
                console.log(`获取文章标签列表失败： ${err.message}`);
                reject(err);
            })
        })
    }
}
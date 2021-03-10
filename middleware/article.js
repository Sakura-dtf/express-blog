const Article = require('../model/article');
const Tabs = require('../model/tabs')
/*
* 文章中间件
* */

module.exports = {
    /**
     * 获取热门文章
    * */
    getHot: (req , res , next) => {
        Article.getHot(3).then(result => {
            req.hots = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取最新文章
     * */

    getList: (req , res , next) => {
        Article.getList().then(result => {
            req.articles = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取类目下的文章
     * */

    getListByCategoryId: (req , res , next) => {
        let id = req.params.id;
        Article.getListByCategoryId(id).then(result => {
            req.articles = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取指定关键词下的文章
     * */

    getListByKeyword: (req , res , next) => {
        let keyword = req.query.keyword;
        Article.getListByKeyword(keyword).then(result => {
            req.articles = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取指定id文章详情
     * */

    getArticleById: (req , res , next) => {
        let id = req.params.id;
        Article.getArticleById(id).then(result => {
            req.article = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取指定id文章标签列表
     * */

    getTabByArticleId: (req , res , next) => {
        let id = req.params.id;
        Tabs.getTabByArticleId(id).then(result => {
            req.tabs = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取上一篇文章
     * */

    getPrev: (req , res , next) => {
        let id = req.params.id;
        Article.getPrevArticle(id).then(result => {
            req.prev = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取下一篇文章
     * */

    getNext: (req , res , next) => {
        let id = req.params.id;
        Article.getNextArticle(id).then(result => {
            req.next = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 获取总博文数
     * */


    getCount: (req,res,next)=>{
        Article.getCount(req.query.category_id,req.query.hot).then(result => {
            req.articleCount = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取指定页文章
     * */

    getPage: (req , res , next) => {
        Article.getPage(res.start,res.size,req.query.category_id,req.query.hot).then(result => {
            req.pageList = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 设置热门状态
     * */

    setHot: (req , res , next) => {
        let {id,hot} = req.query;
        Article.setHot(id,hot).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 添加文章
     * */

    add: (req , res , next) => {

        let {title,content,hot,category_id} = req.body;


        let article = {
            title,
            content,
            hot: hot ? 1 : 0,
            category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        };

        Article.add(article).then(result => {
            req.insertId = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 删除文章
     * */

    del: (req , res , next) => {

        let {id} = req.query;


        Article.del(id).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


    /**
     * 编辑文章
     * */

    edit: (req , res , next) => {

        let {title,content,hot,category_id,id} = req.body;

        let article = {
            id,
            title,
            content,
            hot: hot ? 1 : 0,
            category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        };

        console.log(article);

        Article.edit(article).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },


}
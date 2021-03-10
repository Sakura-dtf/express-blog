/**
* 权限子路由
 * */


module.exports = {
    /**
     * 从session中读取数据
     * */

    getUser: (req,res,next) => {
        req.user = req.session.user;
        next();
    },
    /**
     * 是否允许用户进行后台管理页
     * */

    allowToAdmin: (req,res,next)=>{
        let user = req.session.user;

        if(user){
            req.user = user;
            next();
        }else {
            res.redirect('/login')
        }
    }


}
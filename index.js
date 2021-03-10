/*
* 入口模块
* */

const path = require('path');
const fs = require('fs');
const express = require('express');

/*
* 创建express实例对象
* */

const app = express();


/*
* 上传文件配置
* */

const multer = require('multer');

const upload = multer({
    dest: './static/upload',  //上传存储目录
    limits: {
        fileSize: 1024 * 1024 * 2  //单个文件大小 限制在2M以内
    }
})



/*
* session设置
* */

const  session = require('cookie-session');

app.use(session({
    keys: ['dtf'],
    maxAge: 1000 * 60 * 30
}))

/*


*
* session延期配置
* */

app.use((req,res,next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next();
})


/*
* 模板引擎的设置
* */

app.set('view engine','html');
app.set('view',`${__dirname}/views`);
app.engine('html',require('ejs').renderFile);


/*
* 静态资源配置
* */

app.use(express.static('static'));

/*
* 配置post请求
* */


const bodyParser = require('body-parser');
app.use(bodyParser.json())   //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false})) // 调试工具如果出现警告请加上extended: false
app.use(express.urlencoded({extended:true}));





//调用路由


/*
* 调用首页子路由
* */
app.use('/',require('./router/index'));
app.use('/index',require('./router/index'));

/*
* 调用文章子路由
* */
app.use('/article',require('./router/article'));


/*
* 调用搜索子路由
* */
app.use('/search',require('./router/search'));


/*
* 调用登录子路由
* */

app.use('/login',require('./router/login'));



/*
* 调用用户（登出）子路由
* */

app.use('/user/logout',require('./router/user'));

/**
 * 进行验证
 * */

app.use('/admin/?*',require('./middleware/auth').allowToAdmin);


/**
 * 上传操作
 * */

app.post('/admin/*',upload.single('upload'),(req,res,next) => {
    //上传成功后的文件

    let {file} = req;

    //body里面存放了表单的文本域信息
    console.log(req.body);
    //file存放了单个文件的信息
    console.log(req.file);
    if (!file) {
    } else {
        // file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname);
        console.log(file.originalname);
        console.log(extname);
        fs.renameSync(file.path, file.path + extname);
        //file.filename ==> 上传后的问件名
        req.uploadUrl = '/upload/' + file.filename + extname;
    }
    next();
})



/*
* 调用后台首页子路由
* */

app.use('/admin/index',require('./router/admin/index'));

app.use('/admin',require('./router/admin/index'));

/**
* 调用后台文章子路由
 * */

app.use('/admin/article',require('./router/admin/article'));


/**
 * 调用后台类目子路由
 * */

app.use('/admin/category',require('./router/admin/category'));



/**
 * 调用后台日志子路由
 * */

app.use('/admin/log',require('./router/admin/log'));


/**
 * 调用后台账号子路由
 * */

app.use('/admin/account',require('./router/admin/account'));




/*
* 监听端口
* */

app.listen('4000',() =>{
    console.log('服务器开启成功')
})
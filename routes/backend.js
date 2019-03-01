var token = require("../token/token");
var Mock = require("mockjs");
var express = require('express');
var path = require("path");
// 处理图片
var fs = require("fs");//操作文件
var multer = require('multer');//接收图片
var router = express.Router();
/* GET home page. */

// 1.验证码地址
router.get('/backend/login/pic/:img', function(req, res, next) {
    var filename = req.params.img
    console.log("__dirname",__dirname);
    res.sendFile( path.resolve(__dirname,"../","static","imgs") + "/" + Mock.mock("@natural(1,3)") + ".jpg" );
    console.log("Request for " + req.url + " received.");
//   res.render('index', { title: resa });
});
// 2. 登录(一级管理员,二级管理员)
router.post('/backend/login', function(req, res, next) {
    // post请求带参数的接收方法
    var username = req.body.u;
    var password = req.body.p;
    var code = req.body.code;
    console.log("1111",req.body)
    if(password=="admin" && username=="admin" && code=="111") {
        console.log("1111111")
        var token1 = token.createToken(req.query.code,10000);
        var data = Mock.mock({
            token:token1,
            "aid|1-43":1, // aid 为admin id
            "rid|1-43":1, // rid 为用户区域id
            "level|1-1": 1 // level 为用户等级，等级为1为一级管理员 2 为二级管理员
          });
        var result = JSON.stringify(data);
        res.send(result)
    } else {
        // 错误的时候返回异常值
        res.send({err:"err"})
    }
//   res.render('index', { title: resa });
});
// 3. 查询用户信息页 (二级管理员)
router.get('/backend/wxuser/rid/:rid/size/:size', function(req, res, next) {
    var rid = req.params.rid;
    var size = req.params.size;
    var data = Mock.mock({
        ["res|"+size+"-"+size]:[{
            "uid|1-1000": 1, // aid 为admin id
            name:'@cname()', // rid 为用户区域id
            'sex|0-1': 1,
            'phone|13600000000-18600000000':0,
            cid: '@id()',
            'agree|0-1': true,
            'state|0-4':1,
            ridname:"@county()",
            comm:"@county(true)",
        }]
    });
    var result = JSON.stringify(data.res);
    res.send(result)
//   res.render('index', { title: resa });
});
// 4. 更新用户状态 (一级管理员,二级管理员)
router.put('/backend/wxuser/uid/:uid/state/:state', function(req, res, next) {
    var uid = req.params.uid;
    var state = parseInt(req.params.state);
    // var result = JSON.stringify(data.res);
    // res.send(result)
    switch (state) {
        case 3:
            console.log("报名未通过 人数已满")
            break;
        case 4:
            console.log("报名成功")
            break;      
        default:
            console.log("other")
            break;
    }
    res.send(true);
//   res.render('index', { title: resa });
});

// 5. 更改用户密码(一级管理员,二级管理员)
router.put('/backend/admin/aid/:aid/password/:password/token/:token', function(req, res, next) {
    var uid = req.params.uid;
    res.send(true);
//   res.render('index', { title: resa });
});


// 6. 一级管理员 获取二级管理员的列表
router.get('/backend/aid/all', function(req, res, next) {
    var uid = req.params.uid;
    
    var data = Mock.mock({
        ["res|"+size+"-"+size]:[{
            "org|1-1000": 1, // org单位名称
            name:'@cname()', // 子管理员姓名
            'sex|0-1': 1, // 性别
            'phone|13600000000-18600000000':0, // 手机号码
            cid: '@id()', // cid 身份证
            'qq|13600000000-18600000000':0,
            rname:"@county()", // 区域名称
        }]
    });
    var result = JSON.stringify(data.res);
    res.send(true);
//   res.render('index', { title: resa });
});

// 7. 一级管理员 添加赛事图片等相关信息
router.post('/backend/sportevent', function(req, res, next) {
    var title = req.query.title;
    var theme = req.query.theme;
    var content = req.query.content;
    var imgurl = req.query.imgurl;
    var startime = req.query.startime;
    var expiretime = req.query.expiretime;
    var place = req.query.place;
    var arrangement = req.query.arrangement;
    var rule = req.query.rule;
    var organizers = req.query.organizers;
//     {title:"标题",
//     theme:"主题以",
//     content: "内容",
//     imgurl:"images/sportevents/s1.jpg",
//     startime:1234567890, // 13位时间戳
//     expiretime:1234567890,// 13位时间戳
//     place:”奥林匹克森林公园南园篮球场举办地点”,
//     arrangement:”赛事安排”,
//     rule:”1、采用中国篮球协会...”,
//     organizers:”朝阳区社会体育管理中心＂,
//   }
    res.send(true);
//   res.render('index', { title: resa });
});
// 8. 一级管理员 更新赛事图片等相关信息
router.put('/backend/sportevent/sid/:sid', function(req, res, next) {
    var title = req.query.title;
    var theme = req.query.theme;
    var content = req.query.content;
    var imgurl = req.query.imgurl;
    var startime = req.query.startime;
    var expiretime = req.query.expiretime;
    var place = req.query.place;
    var arrangement = req.query.arrangement;
    var rule = req.query.rule;
    var organizers = req.query.organizers;
//     {title:"标题",
//     theme:"主题以",
//     content: "内容",
//     imgurl:"images/sportevents/s1.jpg",
//     startime:1234567890, // 13位时间戳
//     expiretime:1234567890,// 13位时间戳
//     place:”奥林匹克森林公园南园篮球场举办地点”,
//     arrangement:”赛事安排”,
//     rule:”1、采用中国篮球协会...”,
//     organizers:”朝阳区社会体育管理中心＂,
//   }
    res.send(true);
//   res.render('index', { title: resa });
});

//  8. 相关的图片信息读取流程接口

var upload = multer({
    dest: './uploads'
});//定义图片上传的临时目录

// 单域多文件上传：input[file]的 multiple=="multiple"
router.post('/uploads', upload.array('imageFile', 5), function(req, res, next) {
    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fs.rename(req.files[i].path, "upload/" + req.files[i].originalname, function(err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })
    }
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"//允许跨域。。。
    });
      // req.body 将具有文本域数据, 如果存在的话
    res.end(JSON.stringify(req.files)+JSON.stringify(req.body));
})

// 单域单文件上传：input[file]的 multiple != "multiple"
router.post('/upload', upload.single('imageFile'), function(req, res, next) {
    // req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）
    
    fs.rename(req.file.path, "upload/" + req.file.originalname, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(req.file)+JSON.stringify(req.body));
})


module.exports = router;


var token = require("../token/token");
var Mock = require("mockjs");
var express = require('express');

var router = express.Router();

// 1.微信小程序登录并根据code返回 openid和 sessionid
router.get('/wx/login/code/:code', function(req, res, next) {
  var token1 = token.createToken(req.params.code,10000);
  console.log("222222222222222login")
  var data = Mock.mock({
        "openid": '@string( 17, 19 )',
        "sessionid":token1
      })
  var resa = JSON.stringify(data);
  res.send(resa);
//   res.render('index', { title: resa });
});
// 2.微信小程序获取歇后语
router.get('/wx/everyday/day/:day', function(req, res, next) {
    var data = Mock.mock(
            {
              imageurl:'@image()',
              content:'@cparagraph(1)',
            }
          )
    var resa = JSON.stringify(data);
    res.send(resa);
    //   res.render('index', { title: resa });
});

// 3.登录首页获取最新数量的赛事列表（日期降序排列）
router.get('/wx/sportevents/size/:size', function(req, res, next) {
    var a = req.params.size
    var name  = 'arrs|'+ a;
    var data = Mock.mock({
        [name]:[
            {
                'sid|1-60': 0,
                rid:'@natural(0,43)',
                title:'@csentence(20)',
                content:'@cparagraph(5)',
                inserttime:'@natural(1531191176, 1541191176)',
                starttime:'@natural(1531191176, 1541191176)',
                Expiretime:'@natural(1531191176, 1541191176)',
                imgurl:'@image()',
                nums:'@natural(0,400)'
            }
        ]
    });
    var resa = JSON.stringify(data.arrs);
    res.send(resa);
  //   res.render('index', { title: resa });
});

// 4.加载之前的数据(size代表数据限制数量 now 为传过去的时间发布时间，size为返回多少量默认最多10个
router.get('/wx/sportevents/now/:now/size/:size', function(req, res, next) {
    var size = req.params.size;
    var start = req.params.now;
    var data = Mock.mock({
        ['arrs|'+size]:[
            {
                'sid|1-60': 0,
                "rid|1-43":1,
                title:'@csentence(20)',
                content:'@cparagraph(5)',
                'inserttime|1531191176-1541191176':1,
                'starttime|1531191176-1541191176':1,
                'expiretime|1531191176-1541191176':1,
                imgurl:'@image()',
                'nums|0-400':1,
            }
        ]
    });
    var resa = JSON.stringify(data.arrs);
    res.send(resa);
});
// 5.该接口是用户刷新下拉更新最新时间的时候用的,根据last(10位时间戳) 和now(10位时间戳)获取数据
router.get('/wx/sportevents/last/:last/now/:now', function(req, res, next) {
    var last = req.params.last;
    var start = req.params.now;
    var size = '@natural(0,5)';
    var data = Mock.mock({
        ['arrs|'+size]:[
            {
                'sid|1-60': 0,
                "rid|1-43":1,
                title:'@csentence(20)',
                content:'@cparagraph(5)',
                inserttime:'@natural(1531191176, 1541191176)',
                starttime:'@natural(1531191176, 1541191176)',
                Expiretime:'@natural(1531191176, 1541191176)',
                imgurl:'@image()',
                nums:'@natural(0,400)'
            }
        ]
    });
    var resa = JSON.stringify(data.arrs);
    res.send(resa);
    //   res.render('index', { title: resa });
});

// 6.赛事列表
// a).当state为true的时候根据用户的openid返回报名状态用户可以根据openid
// b).state为false的时候不用返回uidstate 用户可以根据openid
router.get('/wx/sportevent/sid/:sid', function(req, res, next) {
    var sid = req.params.sid;
    var state = req.params.state;
    var size = '@natural(0,5)';
    var data = Mock.mock({
            title:'@csentence(20 )',
            theme: '@cname( 40,100 )',
            content:'@cparagraph(5)',
            imgurl:'@image()',
            startime:'@natural(1531191176, 1541191176)',
            Inserttime:'@natural(1531191176, 1541191176)',
            place:'@csentence(1 )',
            arrangement:'@cname( 40,100 )',
            rule:'@cname( 40,100 )',
            organizers:'@city( )',
            uidstate: '@natural(2,4)', // 单个用户在当前下的报名条件
    });
    var resa = JSON.stringify(data.arrs);
    res.send(resa);
    //   res.render('index', { title: resa });
});
// 7.直接报名,不可重复报名切记
router.post('/wx/entrytable/sid/:sid', function(req, res, next) {
    var sid = req.params.sid;
    var state = req.params.state;
    var size = '@natural(0,5)';
    var resa = '@boolean()';
    res.send(resa);
    //   res.render('index', { title: resa });
});
// 8.这里显示区域的列表，让用户筛选
router.get('/wx/rid/all', function(req, res, next) {
    var sid = req.params.sid;
    var state = req.params.state;
    var size = '@natural(0,5)';
    var data = Mock.mock({
        "arr|1-10":[{
            "rid|0-5":1,
            "name|0-5":'@county()',
            }]}
    );
    var resa = JSON.stringify(data.arr);
    res.send(resa);
    //   res.render('index', { title: resa });
});
// 8.手机验证，在后台用来注册用的
router.get('/wx/sms/:phone', function(req, res, next) {
    var phone = req.params.phone;
    
    res.send(true);
    //   res.render('index', { title: resa });
});
// 8.1.用户注册信息 并返回uid 用户在数据库中的id编号,为了报名使用
router.post('/wx/wxuser/register', function(req, res, next) {
    var name = req.query.name;
    var sex = req.query.sex;
    var phone = req.query.phone;
    var code = req.query.code;
    var cid = req.query.cid;
    var rid = req.query.rid;
    var agree = req.query.agree;
    var comm = req.query.comm;
    console.log("name",name)
    console.log("sex",sex)
    console.log("phone",phone)
    console.log("code",code)
    console.log("cid",cid)
    console.log("rid",rid)
    console.log("agree",agree)
    console.log("comm",comm)
    var data = Mock.mock({
        "arr|1-10":[{
            "uid|0-5":1,
        }]}
    );
    var resa = JSON.stringify(data.arr);
    res.send(resa);
    //   res.render('index', { title: resa });
});
// 9.用户点击个人页，获取所有相关信息，没有的电话返回空
router.get('/wx/wxuser/info', function(req, res, next) {
    var data = Mock.mock(
            {
                uid: '@id()',
                name: '@cname()',
                cid: '@id()',
                'phone|13600000000-18600000000':0,
                ridname:"@county()",
                comm:"@county(true)",
                'sids|0-5':[
                    {
                        'sid|1-60': 0,
                        'rid|1-60': 0,
                        title:'@csentence(20)',
                        inserttime:'@natural(1531191176, 1541191176)',
                            starttime:'@natural(1531191176, 1541191176)',
                            expiretime:'@natural(1531191176, 1541191176)',
                        imgurl:'@image()',
                        uidstate:'@natural(2,4)',
                        nums:'@natural(0,400)'
                    }
                ]
        })
    var resa = JSON.stringify(data);
    res.send(resa);
    //   res.render('index', { title: resa });
});



module.exports = router;

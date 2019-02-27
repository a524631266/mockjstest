var token = require("../token/token");
var Mock = require("mockjs");
var express = require('express');

var router = express.Router();
/* GET home page. */
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

router.get('/wx/sportevent/sid/:sid/state/:state', function(req, res, next) {
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
            uidstate: '@natural(0,4)',
    });
    var resa = JSON.stringify(data.arrs);
    res.send(resa);
    //   res.render('index', { title: resa });
});

router.post('/wx/entrytable/sid/:sid', function(req, res, next) {
    var sid = req.params.sid;
    var state = req.params.state;
    var size = '@natural(0,5)';
    var resa = '@boolean()';
    res.send(resa);
    //   res.render('index', { title: resa });
});

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

router.get('/wx/sms/:phone', function(req, res, next) {
    var phone = req.params.phone;
    
    res.send(true);
    //   res.render('index', { title: resa });
});

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
    res.send(true);
    //   res.render('index', { title: resa });
});

router.get('/wx/wxuser/info', function(req, res, next) {
    var data = Mock.mock(
            {
                uid: '@id()',
                name: '@cname()',
                cid: '@id()',
                phone:'@id()',
                ridname:"@county()",
                comm:"@county(true)",
                'sids|0-10':[
                    {
                        'sid|1-60': 0,
                        'rid|1-60': 0,
                        title:'@csentence(20)',
                        inserttime:'@natural(1531191176, 1541191176)',
                            starttime:'@natural(1531191176, 1541191176)',
                            expiretime:'@natural(1531191176, 1541191176)',
                        imgurl:'@image()',
                        uidstate:'@natural(0,4)',
                        nums:'@natural(0,400)'
                    }
                ]
        })
    var resa = JSON.stringify(data);
    res.send(resa);
    //   res.render('index', { title: resa });
});


module.exports = router;

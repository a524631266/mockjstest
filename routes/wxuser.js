const token = require("../token/token");
const Mock = require("mockjs");
var express = require('express');

var router = express.Router();
/* GET home page. */
router.get('/wx/login/code/:code', function(req, res, next) {
  const token1 = token.createToken(req.params.code,10000);
  console.log("222222222222222login")
  const data = Mock.mock({
        "openid": Mock.Random.string( 17, 19 ),
        "sessionid":token1
      })
  const resa = JSON.stringify(data);
  res.send(resa);
//   res.render('index', { title: resa });
});



router.get('/wx/sportevents/size/:size', function(req, res, next) {
    const a = req.params.size
    const data = Mock.mock({
        ['arrs|'+a]:[
            {
                'sid|1-60': 0,
                rid:Mock.Random.natural(0,43),
                title:Mock.Random.cname( 20, 30 ),
                content:Mock.Random.cname( 50, 60 ),
                inserttime:Mock.Random.natural(1531191176, 1541191176),
                starttime:Mock.Random.natural(1531191176, 1541191176),
                Expiretime:Mock.Random.natural(1531191176, 1541191176),
                imgurl:Mock.Random.image(),
                nums:Mock.Random.natural(0,400)
            }
        ]
    });
    const resa = JSON.stringify(data.arrs);
    res.send(resa);
  //   res.render('index', { title: resa });
  });
module.exports = router;

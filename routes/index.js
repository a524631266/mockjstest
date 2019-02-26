const Mock = require("mockjs");
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  const data = Mock.mock({
    "list|0-10":[
      {
        'id|+1':1
      }
    ]
  });
  const resa = JSON.stringify(data);
  res.render('index', { title: resa });
});

router.get('/mockjs', function(req, res, next) {
  const data = Mock.mock({
    "list|0-10":[
      {
        'id|+1':1
      }
    ]
  });
  const resa = JSON.stringify(data);
  // res.render('index', { title: resa });
  res.send(resa);
});

module.exports = router;

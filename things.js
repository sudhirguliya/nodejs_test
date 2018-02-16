var express = require("express");
var router = express.express.Router();

router.get('/', function(req, res){
res.send('GET router on things');
});

router.post('/', function(req, res){
res.send('POST router on things');
});

module.exports = router;


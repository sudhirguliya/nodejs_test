var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
res.send('GET router on things');
});

router.post('/', function(req, res){
res.send('POST router on things');
});

router.get('/:id([0-9]{5})', function(req, res){
	res.send('The id specified is: '+req.params.id)
})

// Pattern match routes
router.get('/pattern/:id([0-9]{5})', function(req, res){
	res.send('The id specified is: '+req.params.id)
})

router.get('/:name/:id', function(req, res){
	res.send('The id specified is: '+req.params.id+ ' and name is: '+req.params.name)
})

module.exports = router;


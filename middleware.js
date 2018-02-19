var express = require('express');
var router = express.Router();

//Middleware function to log request protocol
router.use(function(req, res, next){
   console.log("A request for things received at " + Date.now());
   next();
});

// Route handler that sends the response
router.get('/', function(req, res, next){
   res.send('middleware');
   next();
});

router.get('/', function(req, res, next){
   console.log('middleware again');
   next();
});

router.use('/', function(req, res){
   console.log('End');
});

module.exports = router;
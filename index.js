var express = require("express");
var bodyParser = require("body-parser");
var things 	= require('./things.js');
var middleware 	= require('./middleware.js');
var app = express();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/static', express.static('public'));

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/forms', function(req, res){
   res.render('form');
});
app.post('/forms', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.get('/first_template', function(req, res){
   res.render('first_view');
});

app.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});

app.get('/components', function(req, res){
    res.render('content');
});

app.get('/', function(req, res) {
	res.send("Hello world");
});

app.get('/hello', function(req, res){
	res.send("Hello World Again '/hello'!\n");
});

app.all('/all', function(req, res){
	res.send("Hello World All '/hello'!\n");
});


app.use('/things', things);
app.use('/middleware', middleware);

/***********************************/
//Invalid url function
app.get('*', function(req, res){
	res.send('Sorry, this is invalid url.')
})

app.listen(3000);
console.log("server started at 3000 port");


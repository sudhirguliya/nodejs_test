var express = require("express");
var app = express();
app.get('/', function(req, res) {
res.send("Hello world");
});

app.get('/hello', function(req, res){
res.send("Hello World Again '/hello'!\n");
});

app.all('/all', function(req, res){
res.send("Hello World All '/hello'!\n");
});

var things = require('./things.js');
app.use('/things', things);

app.listen(3000);
console.log("server started at 3000 port");


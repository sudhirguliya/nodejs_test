var express 	= require("express");
const path 		= require('path');
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose")
var things 		= require('./things.js');
//Person 		= require("./model/Person.js");
var middleware 	= require('./middleware.js');
var app 		= express();

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static('public'));

app.set('view engine', 'pug')
app.set('views', './views')

mongoose.connect('mongodb://localhost/my_test')
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
   Person.find(function(err, response){
	   	if(err){
	   		res.render('show_person', {message: "Sorry, Database can not find data",
	   		type: "error" });
	   	}else{
	      //res.json(response);
	      res.render('show_person', {message: "Show all Person",
	   		type: "success", responses: response });
	  	}
   });
});

app.get('/add_person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body;
   //console.log(personInfo);
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
           message: "Sorry, you provided worng info", type: "error"
       });
   }else{
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
      newPerson.save(function(err, Person){
      	console.log(Person);
         if(err)
            res.render('show_message', {
               message : "Database error", type : "error"
            });
         else
            res.render('show_message', {
                  message: "New person added", 
                  type: "success", person: personInfo, 
                  savePerson: Person
               });
      });
   }
});

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


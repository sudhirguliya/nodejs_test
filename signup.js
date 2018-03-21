var express 	= require("express");
var router      = express.Router();
const path 		= require('path');
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose");
//var multer      = require('multer');
//var upload      = multer();
var session     = require("express-session");
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })); 
//router.use(upload.array());
router.use(cookieParser());
router.use(session({secret: "sudhirk"}));

var Users = [];

router.get('/', function(req, res){
    res.render('signup');
    console.log('Signup');
 });
router.post('/', function(req, res){
    if(!req.body.user_id || !req.body.password || !req.body.name || !req.body.age || !req.body.nationality){
        res.status("400");
        res.send("Invalid details!");
     } else {
        /* Users.filter(function(user){
           if(user.user_id === req.body.user_id){
              res.render('signup', {
                 message: "User Already Exists! Login or choose another user id"});
           }
        }); */
        var newUser = {user_id: req.body.user_id, password: req.body.password, name: req.body.name, age: req.body.age, nationality: req.body.nationality};
        Users.push(newUser);
        req.session.user = newUser;
        console.log(newUser);
        res.redirect('/protected_page');
     }
    //res.render('signup', {message: "Show all Person", type: "success" });
    //console.log('Post Signup');
 });


 module.exports = router;
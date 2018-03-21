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

function checkSignIn(req, res, next){
    if(req.session.user){
       console.log('Login Set Session: '+req.session.user)
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log('Login Session: '+req.session.user);
       //res.render('signup', {message: err });
       next(err);  //Error, trying to access unauthorized page!
       //res.redirect('/login');
    }
 }
router.get('/',   function(req, res){
    res.render('login');
    console.log('Signin');
 });
router.post('/', function(req, res){
    console.log('Users: '+Users);
    if(!req.body.user_id || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
        res.render('login', {message: "Please enter both id and password"})
     } else {
        Users.filter(function(user){
            if(user.user_id === req.body.user_id && user.password === req.body.password){
               req.session.user = user;
               res.redirect('/protected_page');
            }
         });
        res.render('login', {message: "Invalid credentials!"});
     }
    //res.render('signup', {message: "Show all Person", type: "success" });
    //console.log('Post Signup');
 });


 module.exports = router;
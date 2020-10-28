 //MY SERVER CODE

// This is where my node application starts 
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require("fs");
const nodemailer = require('nodemailer');
const path = require('path');
const readline = require('readline');



const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = 'token.json'
// the process.env values are set in .env
passport.use(
  new GoogleStrategy(
  {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://'+process.env.PROJECT_DOMAIN+
    '.glitch.me/login/google/return',
  scope: 'https://www.googleapis.com/auth/userinfo.email',   
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  


    
function(token, tokenSecret, profile, cb) 
  { 
    return cb(null, profile);    
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var express = require('express');
var app = express();
var expressSession = require('express-session');

// cookies are used to save authentication
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({ secret:'watchingfairies', resave: true, saveUninitialized: true, maxAge: (90 * 24 * 3600000) }));
app.use(passport.initialize());
app.use(passport.session());

// index route
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// on clicking "logoff" the cookie is cleared
app.get('/logoff',
  function(req, res) {
    res.clearCookie('google-passport-example');
    res.redirect("/");
  }
);
            
app.get("/auth/google", passport.authenticate('google'));

app.get('/login/google/return', 
  passport.authenticate('google', 
    { successRedirect: '/setcookie', failureRedirect: "/" } 
  )
);

// on successful auth, a cookie is set before redirecting
// to the success view

app.get('/setcookie', requireUser,
        
        function(req, res)
{
  if(req.get('Referrer') && req.get('Referrer').indexOf("google.co.in")!=-1)
  {
      res.cookie('google-passport-example', new Date());     
      res.redirect('/success'); 
       // console.log("Successfull authentication Thor");
    
    } 
  else 
    {
       res.redirect('/');
    }
  }
);


// if cookie exists, success. otherwise, user is redirected to index
app.get('/success', requireLogin,
  function(req, res) {
    res.sendFile(__dirname + '/views/success.html');
  

//If cannot retrieve email id directly from REST the following code removes unnessary characters and returns only the email id to successfully store in file

var myJSON = JSON.stringify(req.user.emails);
myJSON = myJSON.replace(/[{()}]/g, '');
const a1 = myJSON.replace(':', '');
const a2 = a1.replace('value', '');
const a3 = a2.replace('verified', '');
const a4 = a3.replace('true', '');
const a5 = a4.replace('\"', '');
var a6= a5.replace(/\s|\[|\]/g,"");
const a7 = a5.replace('\"', ''); 
const a8 = a7.replace('\"', ''); 
const a9 = a8.replace(',', ''); 
const a10 = a9.replace('\"', '');
const a11 = a10.replace('\"', '');
const a12 = a11.replace('\"', '');
const emailstoredinfile = a12.replace(':', '');
console.log(emailstoredinfile);


  
 //writes a file to store the obtained credentials in the file
 
  fs.writeFile('/app/emailid.txt', dd, function(err) 
  {
    if(err) 
    {
        return console.log(err);
    }
    console.log("The email was saved in the file and it  was saved too!");  
  }); 
 }
);



//SENDING MAIL Through nodemailer


//For the sake of testing can use Google playgrounds to generate refresh and access tokens and can add in the file

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
      user: '-',
            clientId: '-',
            clientSecret: '-',
            refreshToken: '-',
            accessToken: '-'
  },
});

var mailOptions = {
    from: '-',
    to: '-',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
})


function requireLogin (req, res, next)
{
  if (!req.cookies['google-passport-example']) 
  {
    res.redirect('/');
  } else 
  {
    next();
  }
};

function requireUser (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});




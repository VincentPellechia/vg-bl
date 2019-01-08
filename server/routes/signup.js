console.log("server is starting");

var express= require('express');
const path = require('path');
var axios = require('axios');
var app = express();
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyC_8_dOKhWyulFNKD9voJCfQOesW-GJUg8",
  authDomain: "game-backlog-app.firebaseapp.com",
  databaseURL: "https://game-backlog-app.firebaseio.com",
  storageBucket: "game-backlog-app.appspot.com",
};
firebase.initializeApp(config);
//var games = JSON.parse(data);


app.get('/', function(req, res, next) {
  console.log("call to signup");

  res.json();

});

app.get('/:email/:password', function(req,res,next){
  var q = req.params;
  var email = q.email;
  var password = q.password;
  //console.log(email+ " " + password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.log(email);
    console.log(password);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  /*var rep = {
    reply:"This worked!",
  };
  rep = JSON.parse(rep);
  res.json(rep);
*/
res.json();
});

module.exports = app;

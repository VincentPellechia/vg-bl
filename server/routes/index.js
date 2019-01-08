console.log("server is starting");

var express= require('express');
const path = require('path');
var axios = require('axios');
var app = express();
var firebase = require('firebase');
var fs = require('fs');
var way = path.join(__dirname, '../public/games.json');
var data = fs.readFileSync(way);
const request = require('request');

var config = {
  apiKey: "AIzaSyC_8_dOKhWyulFNKD9voJCfQOesW-GJUg8",
  authDomain: "game-backlog-app.firebaseapp.com",
  databaseURL: "https://game-backlog-app.firebaseio.com",
  storageBucket: "game-backlog-app.appspot.com",
};
firebase.initializeApp(config);
//var games = JSON.parse(data);

/* GET home page. */
app.get('/', function(req, res, next) {
  var data = fs.readFileSync(way);
  var games = JSON.parse(data);
  res.json(games);
});
app.get('/signup/:email/:password', function(req,res,next){
  var q = req.params;
  var email = q.email;
  var password = q.password;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

});


app.get('/api', function(req, res, next) {
  console.log("hello");
  axios({
    method: 'POST',
    url: 'https://api-v3.igdb.com/search',
    headers: {
      'Accept': 'application/json',
      'user-key': 'c306790fada94d1ed57f7741ee15a5af',
    },
    data: "fields name; search \"Halo\"; where game != null;"
  })
  .then(result => {

    console.log("Calling api with Halo!");
    //console.log(result.data);
    res.json(result.data);
  })
  .catch(result => {
    console.log("No connection established???");
  })
});

app.get('/api/:name', function(req, res, next) {
  var q = req.params;
  var name = "\""+q.name+"\"";
  console.log(name);
  axios({
    method: 'POST',
    url: 'https://api-v3.igdb.com/search',
    headers: {
      'Accept': 'application/json',
      'user-key': 'c306790fada94d1ed57f7741ee15a5af',
    },
    data: "fields name; search "+name+"; where game != null;limit:20;"
  })
  .then(result => {
    //console.log("It is providing a result here");
    console.log("Call to api with name!");
    res.json(result.data);
  })
  .catch(result => {
    console.log("No connection established???");
  })
});

module.exports = app;

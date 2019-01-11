var express= require('express');
const path = require('path');
var axios = require('axios');
var app = express();
var firebase = require('../firebase');
var database = firebase.database();


app.post('/', function(req, res, next) {
  var ref = database.ref('users');
  var message = "Complete";
  var {usern,email,password} = req.body;

  ref.on('child_added', function(snapshot){
    if(snapshot.val().username === usern){
      console.log("Exists");
      message = "Username Already Exists!";
      free = false;
      ref.off();
      finished(message);
    }
    else if(snapshot.val().email === email){
      console.log("Exists");
      message = "Email Already Exists!";
      free = false;
      finished(message);
    }
    else {
      message = "Complete";
    }
  });

  function finished(mess){
      var rep = {
        usen: usern,
        email: email,
        password: password,
        message: mess
      };
    res.json(rep);
  }
});

app.get('/:email/:password', function(req,res,next){
  var q = req.params;
  var email = q.email;
  var password = q.password;
  var message;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
    var user = firebase.auth().currentUser;
    logUser(user);
    message = "You've Signed Up!";
    finished(message);
  })
  .catch(function(error){
    var errorCode = error.code;
    message = error.message;
    finished(message);

  });

  function logUser(user) {
      var ref = database.ref("users");
      console.log(user.email);
      var obj = {
          "email": user.email
          //...
      };
      ref.push(obj);
  }

  function finished(mess){
    var rep = {
      email: email,
      password: password,
      message: mess
    };
    res.json(rep);
  }
});

/*
firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;
    logUser(user); // Optional
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});

function logUser(user) {
    var ref = firebase.database().ref("users");
    var obj = {
        "user": user,
        ...
    };
    ref.push(obj); // or however you wish to update the node
}

*/

module.exports = app;

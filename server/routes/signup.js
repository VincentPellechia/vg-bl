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
  usern = usern.toLowerCase();
  checkUserName();

  function checkUserName() {
    if(usern.length > 15 || usern.length < 3){failed("Username Has To Be 3-15 Characters Long");}
    else{
      var unref = database.ref("usernames");
      unref.once("value",function(snap) {
        if(snap.child(usern).exists()){
          failed("Username Exists!");
        }
        else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(user){
            var user = firebase.auth().currentUser;
            setUserName();
            logUser(user);
            finished(user);
          })
          .catch(function(error){
            var errorCode = error.code;
            message = error.message;
            failed(message);
          });
        }
      })
    }
  }
  function setUserName() {
    var uid = firebase.auth().currentUser.uid;
    var unref = database.ref("usernames");
    let data = {};
    data[usern] = uid;
    unref.update(data);
  }

  function logUser(user) {
    var uid = firebase.auth().currentUser.uid;
    user.updateProfile({
      displayName: usern
    })
    .catch(function(error){console.log(error)});
    var usref = database.ref("users");
    usref.child(uid).set({
      username: usern,
      email: email
    });
  }
  function failed(mess){
    var rep = {
      usern: usern,
      email: email,
      message: mess
    };
    res.json(rep);
  }
  function finished(user){
    //console.log(firebase.auth().currentUser.uid);
    var x ={
      uid: user.uid,
      usern: usern,
      email: email
    }
    var rep = {
      user: x,
      message: "You've Signed Up!"
    };
    res.json(rep);
  }
});

app.get('/auth', function(req, res, next) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      res.json(user);
      // ...
    } else {
      res.send("Not Signed In")
        // User is signed out.
        // ...   4
    }
  });
});


app.post('/signin', function(req, res, next) {
  var ref = database.ref('users');
  var message = "Complete";
  var {email,password} = req.body;
  //usern = usern.toLowerCase();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(result){

    var user = {
      uid: result.user.uid,
      usern: result.user.displayName,
      email: result.user.email
    }
    //console.log(result.user);
    //console.log(user);
    res.json(user);

  })

  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
});

app.post('/signout', function(req, res, next) {
  var ref = database.ref('users');
  var message = "Complete";
  //usern = usern.toLowerCase();

  firebase.auth().signOut().then(function() {
    res.send("Logged Out");
  }).catch(function(error) {
  // An error happened.
  });
});

/*app.get('/:email/:password', function(req,res,next){
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

*/

module.exports = app;

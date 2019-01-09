//import * as firebase from "firebase";
var firebase = require('firebase');

const config = {
  apiKey: "AIzaSyC_8_dOKhWyulFNKD9voJCfQOesW-GJUg8",
  authDomain: "game-backlog-app.firebaseapp.com",
  databaseURL: "https://game-backlog-app.firebaseio.com",
  storageBucket: "game-backlog-app.appspot.com"
};

module.exports = (!firebase.apps.length ? firebase.initializeApp(config) : firebase.app());

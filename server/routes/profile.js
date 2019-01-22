var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var firebase = require('../firebase');
var database = firebase.database();
var bodyParser = require('body-parser');

const way = path.join(__dirname, '../public/games.json');

/* GET list of . */
router.get('/', function(req, res, next) {
  //var ref = database.ref('gamesList/'+UserID);
  var data = fs.readFileSync(way);
  var games = JSON.parse(data);
  res.json(games);
});

router.get('/:userID', function(req, res){
  var data = req.params;
  var userid = data.userID;
  var ref = database.ref('gamesList/'+userid);
  ref.once('value').then(function(snapshot) {
    /*snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot.val());
    })*/
    let arr = Object.keys(snapshot.val() || {}) .map(k => snapshot.val()[k]);

    res.json(arr);
    // ...
  });
  /*ref.orderByKey().equalTo(name).once('value', function(snapshot){
    if(snapshot.val() !== null){
      res.send('Game already exists!');
      console.log("there is a game");
    }
    else {
      addGame();
    }

    function addGame() {
      console.log(name);
      ref = database.ref('gamesList/'+userid+'/'+name);
      ref.set({
        rating: null,
        status: "Pending"
      });
      res.send('Game has been added!');
    }
    //console.log(snapshot.val());
  });*/


})
/* GET profile listing.
router.get('/add/:name/:id?', function(req,res,next) {
  //console.log(req.body);
  var info = fs.readFileSync(way);
  var games = JSON.parse(info);
  var data = req.params;
  var name = data.name;
  var id = data.id;
  //var ref = database.ref("games");
  var thing = {
    id:id,
    name: name
  };

  games.push(thing);
  var data = JSON.stringify(games, null, 2);

  fs.writeFile(way, data, finished);

  res.json(games);
});*/

router.post('/add', function(req, res){
  var ref = database.ref('games');
  var name = req.body.name;
  var platforms = req.body.platforms;
  var frd = req.body.first_release_date;
  ref.orderByKey().equalTo(name).once('value', function(snapshot){
    if(snapshot.val() !== null){
      res.send('Game already exists!');
      console.log("there is a game");
    }
    else {
      addGame();
    }

    function addGame() {
      console.log(name);
      ref = database.ref('games/'+name);
      ref.set({
        platforms: platforms,
        publisher: "test",
        releaseDate: frd

      });
      res.send('Game has been added!');
    }
    //console.log(snapshot.val());
  });


})

router.post('/:userID/add', function(req, res){
  var data = req.params;
  var userid = data.userID;
  var name = req.body.name;
  var ref = database.ref('gamesList/'+userid);
  ref.orderByKey().equalTo(name).once('value', function(snapshot){
    if(snapshot.val() !== null){
      res.send('Game already exists!');
      console.log("there is a game");
    }
    else {
      addGame();
    }

    function addGame() {
      console.log(name);
      ref = database.ref('gamesList/'+userid+'/'+name);
      ref.set({
        rating: null,
        status: "Pending",
        name: name
      });
      res.send('Game has been added!');
    }
    //console.log(snapshot.val());
  });


})

function finished(err){
  console.log('all set!');
}

module.exports = router;

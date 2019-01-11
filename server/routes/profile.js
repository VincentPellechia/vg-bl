var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var firebase = require('../firebase');
var database = firebase.database();
var bodyParser = require('body-parser');

const way = path.join(__dirname, '../public/games.json');

//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

//console.log(req.body);

/* GET list of . */
router.get('/', function(req, res, next) {
  //var ref = database.ref('gamesList/'+UserID);
  var data = fs.readFileSync(way);
  var games = JSON.parse(data);
  res.json(games);
});

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
  ref.orderByKey().equalTo(name).once('value', function(snapshot){
    if(snapshot.val() !== null){
      console.log("there is a game");
    }
    else {
      addGame();
      console.log("there isn't a game");
    }

    function addGame() {
      console.log(name);
      ref = database.ref('games/'+name);
      ref.set({
        platform: "test",
        publisher: "test",
        releaseDate: "test"

      });
    }
    console.log(snapshot.val());
  });

  res.send('this is the answer!');
})

function finished(err){
  console.log('all set!');
}

module.exports = router;

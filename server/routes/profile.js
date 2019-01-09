var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');
var firebase = require('../firebase');
var database = firebase.database();

const way = path.join(__dirname, '../public/games.json');



/* GET list of . */
router.get('/', function(req, res, next) {
  var data = fs.readFileSync(way);
  var games = JSON.parse(data);
  res.json(games);
});

/* GET profile listing. */
router.get('/add/:name/:id?', function(req,res,next) {
  var info = fs.readFileSync(way);
  var games = JSON.parse(info);
  var data = req.params;
  var name = data.name;
  var id = data.id;
  var thing = {
    id:id,
    name: name
  };
  games.push(thing);
  var data = JSON.stringify(games, null, 2);

  fs.writeFile(way, data, finished);

  res.json(games);
});

function finished(err){
  console.log('all set!');
}

module.exports = router;

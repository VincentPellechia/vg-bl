console.log("server is starting");

var express= require('express');
const path = require('path');
var axios = require('axios');
var app = express();
var fs = require('fs');
var way = path.join(__dirname, '../public/games.json');
var data = fs.readFileSync(way);
const request = require('request');


/* GET home page. */
app.get('/', function(req, res, next) {
  var data = fs.readFileSync(way);
  var games = JSON.parse(data);
  res.json(games);
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
    data: "fields name, game.first_release_date, game.platforms.name; search \"The Witcher 3\"; where game != null; limit: 1;"
  })
  //game.involved_companies.company.name , game.platforms.name
  .then(result => {
    /*var mapped = result.data.map(x => {
      x = {
        name: x.name,
        release_date: x.game.first_release_date
      };
      console.log(x);
      //console.log(x.game.first_release_date);
    })*/
    //console.log(result.data[0]);
    //mapRD(result.data);
    //var obj =
    console.log(mapped);
    //console.log(result.data);
    //res.json(result.data);
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
    data: "fields name, game.platforms.name, game.first_release_date, game.involved_companies.company.name; search "+name+"; where game != null;limit:10;"
  })
  .then(result => {
    console.log(result.data[0].game.involved_companies);
    //getGame(result.data);
    res.json(result.data);
  })
  .catch(result => {
    console.log("No connection established???");
  })
});

module.exports = app;

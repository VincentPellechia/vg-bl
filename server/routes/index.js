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

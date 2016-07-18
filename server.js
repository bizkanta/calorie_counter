'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var dbQueries = require('./db_queries');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('/meals', function(req, res) {
  dbQueries.getMeals(function(meals){
    res.send(meals);
  });
});

app.post('/meals', urlencodedParser, function(req, res) {
  dbQueries.addMeal(req.body.name, req.body.calories, req.body.date, function(row){
    res.send({row});
  });
});

var port = 3000;
app.listen(port, function(){
  console.log('I am listening on port ' + port);
});

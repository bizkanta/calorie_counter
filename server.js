'use strict';

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var db = require('./db_queries');

var app = express();

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password987',
  database: 'calorie_counter'
});

var dbQueries = db(con);

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('/meals', function(req, res) {
  dbQueries.getMeals(function(meals){
    res.send(meals);
  });
});

app.post('/meals', urlencodedParser, function(req, res) {
  dbQueries.addMeal(req.body, function(row){
    res.send(row);
  });
});

app.delete('/meals/:id', urlencodedParser, function(req, res) {
  var id = req.params.id;
  dbQueries.deleteMeal(id, function(err, meal){
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(meal);
    }
  });
});

var port = 3000;
app.listen(port, function(){
  console.log('I am listening on port ' + port);
});

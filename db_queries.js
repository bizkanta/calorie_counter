'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password987',
  database: 'calorie_counter'
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

function getMeals(callback){
  con.query('SELECT * FROM calorie_counter;', function(err, meals){
    if (err) {
      console.log(err.toString());
      return;
    }
    callback(meals);
  });
}

function addMeal(name, calories, date, callback){
  con.query('INSERT INTO calorie_counter SET name = ?, calories = ?, date = ?', [name, calories, date], function(err,meal){
    if(err) {
      console.log(err.toString());
      return;
    }
    callback( {id: meal.insertId, name: name, calories: calories, date: date} );
  });
}

module.exports = {
  getMeals: getMeals,
  addMeal: addMeal
}

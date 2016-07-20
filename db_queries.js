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

var meals = (function(){
  function getMeals(callback){
    con.query('SELECT * FROM calorie_counter;', function(err, meals){
      if (err) {
        console.log(err.toString());
        return;
      }
      callback(meals);
    });
  };

  function addMeal(attributes, callback){
    var query = 'INSERT INTO calorie_counter SET name = ?, calories = ?, date = ?';
    var queryParams = [attributes.name, attributes.calories, attributes.date];
    con.query(query, queryParams, function(err, meal){
      if(err) {
        console.log(err.toString());
        return;
      }
      callback({
        id: meal.insertId,
        name: attributes.name,
        calories: attributes.calories,
        date: attributes.date
      });
    });
  };

  function deleteMeal(id, callback){
    con.query('DELETE FROM calorie_counter WHERE id = ?', id, function(err, meal){
      if(err) {
        console.log(err.toString());
        return;
      } else if (meal.affectedRows === 1) {
        callback({"status": "ok"});
      } else {
        callback({"status": "not exists"});
      }
    });
  }

  return {
    getMeals: getMeals,
    addMeal: addMeal,
    deleteMeal: deleteMeal
  };
})();

module.exports = meals;

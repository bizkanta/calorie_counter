'use strict';

var tape = require('tape');
var sinon = require('sinon');

var meal = require('./db_queries');

tape('true', function(t) {
  t.equal(true, true);
  t.end();
});

tape('proba have been called', function(t) {
  var callback = sinon.spy();
  callback();
  t.ok(callback.called);
  t.end();
});

tape('proba have been called with 3', function(t) {
  var callback = sinon.spy();
  callback(3);
  t.ok(callback.calledWith(3));
  t.end();
});

tape('addmeal calls query', function(t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addMeal({name: "alma"});
  t.ok(mockConnection.query.called);
  t.end();
});


tape('addmeal calls query with proper sql', function(t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: "alma",
    calories: 2,
    date: "ma"
  };

  var expectedSQL = 'INSERT INTO calorie_counter ' +
    '(name, calories, date)' +
    ' VALUES (\'1\', \'alma\', \'2\', \'ma\')';

  testMealModule.addMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});

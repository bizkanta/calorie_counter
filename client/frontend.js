'use strict';

(function(document, Xhr_request){

  var request = new Xhr_request();

  var mealsList = document.querySelector('.meals');
  var nameInputField = document.querySelector('#name');
  var calorieInputField = document.querySelector('#calories');
  var dateInputField = document.querySelector('#date');
  var addButton = document.querySelector('.addButton');

  addButton.addEventListener('click', newMealItem);

  request.getMealsFromServer(insertItemsToDOM);

  function insertItemsToDOM(items) {
    items.forEach(function(item) {
      appendMeals(item);
    });
  }

  function newMealItem(event) {
    event.preventDefault();
    var mealItem = {
      name: nameInputField.value,
      calories: calorieInputField.value,
      date: dateInputField.value
    };
    request.addMealToServer(mealItem, appendMeals);
    nameInputField.value = '';
    calorieInputField.value = '';
    dateInputField.value = '';
    nameInputField.focus();
  }

  function appendMeals(item) {
    var mealItem = `
    <div id="${item.id}" class="mealItem">
      <div class="mealName">${item.name}</div>
      <div class="mealCalories">${item.calories}</div>
      <div class="mealDate">${item.date}</div>
    </div>`;
    mealsList.innerHTML += mealItem;
  }

})(document, Xhr_request);

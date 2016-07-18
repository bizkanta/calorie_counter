'use strict';

(function(document, Xhr_request){

  var request = new Xhr_request();

  var mealsList = document.querySelector('.meals');

  request.getMealsFromServer(insertItemsToDOM);

  function insertItemsToDOM(items) {
    items.forEach(function(item) {
      appendMeals(item);
    });
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

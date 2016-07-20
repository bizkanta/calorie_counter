'use strict';

(function(document, Xhr_request, moment){

  var request = new Xhr_request();

  var mealsList = document.querySelector('.meals');
  var nameInputField = document.querySelector('#name');
  var calorieInputField = document.querySelector('#calories');
  var dateInputField = document.querySelector('#date');
  var addButton = document.querySelector('.addButton');
  var deleteButton = document.querySelector('.deleteButton');
  mealsList.addEventListener('click', selectItem);
  addButton.addEventListener('click', addNewMealItem);
  deleteButton.addEventListener('click', deleteSelectedItem);

  function getCurrentDateAsString() {
    var now = new Date();
    var string = now.toISOString().replace('Z', '');
    console.log(string)
    return '2016-07-20 20:09:47.817'
    return string;
  }
  dateInputField.defaultValue = getCurrentDateAsString();

  request.getMealsFromServer(insertItemsToDOM);

  function insertItemsToDOM(items) {
    items.forEach(function(item) {
      appendMeal(item);
    });
  }

  function addNewMealItem(event) {
    event.preventDefault();
    var mealItem = {
      name: nameInputField.value,
      calories: calorieInputField.value,
      date: dateInputField.value
    };
    request.addMealToServer(mealItem, appendMeal);
    nameInputField.value = '';
    calorieInputField.value = '';
    dateInputField.value = '';
    nameInputField.focus();
  }

  function deleteSelectedItem(event) {
    var selectedItem = document.querySelector('.selectedMeal');
    if (selectedItem) {
      var selectedId = selectedItem.getAttribute('id');
      request.deleteMealFromServer(selectedId, function() {
        selectedItem.remove();
      });
    }
  }

  function selectItem(event) {
    var alreadySelectedItem = document.querySelector('.selectedMeal');
    if (alreadySelectedItem) {
      alreadySelectedItem.classList.remove('selectedMeal');
    }
    var isMealsContainerClicked = event.target.classList.contains('meals');
    if (!isMealsContainerClicked) {
      var selectedRow = findAncestorByClass(event.target, 'mealItem');
      selectedRow.classList.add('selectedMeal');
    }
  }

  function findAncestorByClass(element, classSelector) {
    if (element.classList.contains(classSelector)) {
      return element;
    }
    return findAncestorByClass(element.parentNode, classSelector);
  }

  function appendMeal(item) {
    var date = moment().
    item.date.substring(0, 10) + ' , ' + item.date.substring(12, 16);
    var mealItem = `
    <div id="${item.id}" class="mealItem">
      <div class="mealName">${item.name}</div>
      <div class="mealCalories">${item.calories}</div>
      <div class="mealDate">${date}</div>
    </div>`;
    mealsList.innerHTML += mealItem;
  }

})(document, Xhr_request, moment);

'use strict';

(function(document, Xhr_request, moment, Helper){

  var request = new Xhr_request();
  var helper = new Helper();

  var mealsList = document.querySelector('.meals');
  var nameInputField = document.querySelector('#name');
  var calorieInputField = document.querySelector('#calories');
  var dateInputField = document.querySelector('#date');
  var addButton = document.querySelector('.addButton');
  var deleteButton = document.querySelector('.deleteButton');
  mealsList.addEventListener('click', selectItem);
  addButton.addEventListener('click', addNewMealItem);
  deleteButton.addEventListener('click', deleteSelectedItem);

  dateInputField.defaultValue = helper.getCurrentDateAsString();

  request.getMealsFromServer(insertItemsToDOM);

  function insertItemsToDOM(items) {
    items.forEach(function(item) {
      appendMeal(item);
    });
  }

  function addNewMealItem(event) {
    event.preventDefault();
    if (formIsValid()) {
      var mealItem = {
        name: nameInputField.value,
        calories: calorieInputField.value,
        date: dateInputField.value
      };
      request.addMealToServer(mealItem, function(item) {
        appendMeal(item);
        nameInputField.value = '';
        calorieInputField.value = '';
        dateInputField.value = helper.getCurrentDateAsString();
        nameInputField.focus();
      });
    }
  }

  function formIsValid() {
    var nameFieldIsValid = nameInputField.value.length > 2;
    var calorieFieldIsValid = parseInt(calorieInputField.value) >= 0;
    return nameFieldIsValid && calorieFieldIsValid;
  }

  function deleteSelectedItem(event) {
    var selectedItem = document.querySelector('.selectedMeal');
    var isConfirmChecked = document.getElementById('confirm').checked;
    if (selectedItem) {
      var isDeletable = !isConfirmChecked ||
        (isConfirmChecked && confirm("Are you sure you want to delete this meal?"));
      if (isDeletable) {
        var selectedId = selectedItem.getAttribute('id');
        request.deleteMealFromServer(selectedId, function() {
          selectedItem.remove();
          updateTotal();
        });
      }
    }
  }

  function selectItem(event) {
    var alreadySelectedItem = document.querySelector('.selectedMeal');
    if (alreadySelectedItem) {
      alreadySelectedItem.classList.remove('selectedMeal');
    }
    var isMealsContainerClicked = event.target.classList.contains('meals');
    if (!isMealsContainerClicked) {
      var selectedRow = helper.findAncestorByClass(event.target, 'mealItem');
      selectedRow.classList.add('selectedMeal');
    }
  }

  function updateTotal() {
    var total = document.querySelector('.total');
    total.textContent = getTotalCalories();
  }

  function getTotalCalories() {
    var calories = document.querySelectorAll('.mealCalories');
    var total = 0;
    for (var i = 0; i < calories.length; i++) {
      var calorie = parseInt(calories[i].textContent);
      total += calorie;
    }
    return total;
  }

  function appendMeal(item) {
    var date = helper.getFormattedDate(item.date);
    var mealItem = `
    <div id="${item.id}" class="mealItem">
      <div class="mealName">${item.name}</div>
      <div class="mealCalories">${item.calories}</div>
      <div class="mealDate">${date}</div>
    </div>`;
    mealsList.innerHTML += mealItem;
    updateTotal();
  }

})(document, Xhr_request, moment, Helper);

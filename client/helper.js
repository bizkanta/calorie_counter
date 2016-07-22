'use strict';

function Helper() {

  this.getCurrentDateAsString = function() {
    var now = moment().format('YYYY-MM-DDTHH:mm');
    return now;
  }

  this.getFormattedDate = function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  this.findAncestorByClass = function(element, classSelector) {
    if (element.classList.contains(classSelector)) {
      return element;
    }
    return this.findAncestorByClass(element.parentNode, classSelector);
  }
}

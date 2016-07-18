'use strict';

function Xhr_request(){
  this.url = 'http://127.0.0.1:3000/meals';

  this.getMealsFromServer = function(callback){
    this.createRequest('GET', this.url, null, callback);
  };

  this.createRequest = function(method, url, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(data);
    xhr.onload = function() {
      if (xhr.readyState === xhr.DONE) {
        var response = JSON.parse(xhr.response);
        callback(response);
      };
    };
  }
}

'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.backend = {
    load: function (onSuccess) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';


      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.send();
    }
  };
})();


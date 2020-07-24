'use strict';

(function () {
  var keyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  var generateRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max - min);
    return Math.floor(randomNumber);
  };

  var generateRandomBoolean = function () {
    var randomBoolean = Math.random() >= 0.5;
    return randomBoolean;
  };

  window.utils = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === keyCode.ENTER) {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === keyCode.ESCAPE) {
        action();
      }
    },

    generateRandomNumber: generateRandomNumber,
    generateRandomBoolean: generateRandomBoolean
  };
})();

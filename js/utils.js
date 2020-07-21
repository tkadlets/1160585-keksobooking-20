'use strict';

(function () {
  var keyCode = {
    ENTER: 13,
    ESCAPE: 27
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
    }
  };
})();

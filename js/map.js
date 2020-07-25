'use strict';

(function () {
  // создаем метки
  var pinMargin = {
    LEFT: 25,
    TOP: 70
  };

  var createPin = function (data) {
    var template = document.querySelector('#pin');
    var pin = template.content.cloneNode(true).querySelector('.map__pin');
    var img = pin.querySelector('img');
    img.src = data.author.avatar;
    img.alt = data.offer.title;

    pin.style.left = data.location.x + pinMargin.LEFT + 'px';
    pin.style.top = data.location.y + pinMargin.TOP + 'px';

    return pin;
  };

  window.map = {
    createPin: createPin
  };
})();



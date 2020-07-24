'use strict';

(function () {
  // создаем метки

  var createPins = function (data) {
    var template = document.querySelector('#pin');
    var pin = template.content.cloneNode(true).querySelector('.map__pin');
    var img = pin.querySelector('img');
    img.src = data.author.avatar;
    img.alt = data.offer.title;
    var pinLeft = data.location.x + 25 + 'px';
    var pinTop = data.location.y + 70 + 'px';

    pin.style.left = pinLeft;
    pin.style.top = pinTop;

    return pin;
  };

  window.map = {
    createPins: createPins
  };
})();



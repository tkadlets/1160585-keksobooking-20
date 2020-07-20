'use strict';

(function () {
  // создаем метки
  var createPins = function (data) {
    var pinFragment = document.createDocumentFragment();
    var template = document.querySelector('#pin');
    for (var i = 0; i < 8; i++) {
      var pin = template.content.cloneNode(true).querySelector('.map__pin');
      var img = pin.querySelector('img');
      img.src = data[i].author.avatar;
      img.alt = data[i].offer.title;
      var pinLeft = data[i].location.x + 25 + 'px';
      var pinTop = data[i].location.y + 70 + 'px';

      pin.style.left = pinLeft;
      pin.style.top = pinTop;

      pinFragment.appendChild(pin);
    }
    return pinFragment;
  };

  window.map = {
    createPins: createPins
  };
})();







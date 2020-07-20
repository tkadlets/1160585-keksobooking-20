'use strict';

// отрисовываем метки
var embedPins = function (adsData) {
  var pinFragment = window.map.createPins(adsData);
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(pinFragment);
};

//активируем страницу
var activatePage = function () {
  embedPins(window.data.mockData);
  window.form.enableAdFields();
  window.form.enableFilterFields();

  var map = document.querySelector('.map').classList.remove('map--faded');
  var adForm = document.querySelector('.ad-form').classList.remove('ad-form--disabled');
};

// события
var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    window.form.setAddress();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  window.utils.isEnterEvent(evt, activatePage);
  window.utils.isEnterEvent(evt, window.form.setAddress);
});

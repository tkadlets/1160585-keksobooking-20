'use strict';

// вкл неактивный режим формы:
(function () {
  var disableAdFields = function () {
    var adFormFields = document.querySelectorAll('.ad-form input, .ad-form select');
    for (var i = 0; i < adFormFields.length; i++) {
      adFormFields[i].setAttribute('disabled', true);
    }
  };

  var disableFilterFields = function () {
    var filtersFormFields = document.querySelectorAll('.map__filters input, .map__filters select');
    for (var i = 0; i < filtersFormFields.length; i++) {
      filtersFormFields[i].setAttribute('disabled', true);
    }
  };

  disableAdFields();
  disableFilterFields();

  // вкл активный режим формы
  var enableAdFields = function () {
    var adFormFields = document.querySelectorAll('.ad-form input, .ad-form select');
    for (var i = 0; i < adFormFields.length; i++) {
      adFormFields[i].removeAttribute('disabled');
    }
  };

  var enableFilterFields = function () {
    var filtersFormFields = document.querySelectorAll('.map__filters input, .map__filters select');
    for (var i = 0; i < filtersFormFields.length; i++) {
      filtersFormFields[i].removeAttribute('disabled');
    }
  };

  // заполняем адрес
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  var setAddress = function () {
    var mainPinLocationX = parseInt(mainPin.style.left, 10) + (parseInt(mainPin.offsetWidth, 10) / 2);
    var mainPinLocationY = map.classList.contains('map--faded')
      ? parseInt(mainPin.style.top, 10) + (parseInt(mainPin.offsetWidth, 10) / 2)
      : parseInt(mainPin.style.top, 10) + (parseInt(mainPin.offsetHeight, 10));
    addressField.value = Math.round(mainPinLocationX) + ', ' + Math.round(mainPinLocationY);
  };

  setAddress();

  // валидируем ad-form
  var adType = document.querySelector('#type');
  var adPrice = document.querySelector('#price');

  var rangePrice = function () {

    if (adType.value === 'bungalo') {
      adPrice.setAttribute('min', '0');
      adPrice.placeholder = '0';
    } else if (adType.value === 'flat') {
      adPrice.setAttribute('min', '1000');
      adPrice.placeholder = '1000';
    } else if (adType.value === 'house') {
      adPrice.setAttribute('min', '5000');
      adPrice.placeholder = '5000';
    } else if (adType.value === 'palace') {
      adPrice.setAttribute('min', '10000');
      adPrice.placeholder = '10000';
    }
  };

  rangePrice();
  adType.addEventListener('change', function () {
    rangePrice();
  });


  var checkInTime = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');
  var onCheckInChange = function () {
    checkOutTime.value = checkInTime.value;
  };
  var onCheckOutChange = function () {
    checkInTime.value = checkOutTime.value;
  };

  checkInTime.addEventListener('change', onCheckInChange);

  checkOutTime.addEventListener('change', onCheckOutChange);


  var guestsNumber = document.querySelector('#capacity');
  var roomsNumber = document.querySelector('#room_number');
  guestsNumber.addEventListener('change', function () {
    var roomsNmbr = Number(roomsNumber.value);
    var guestsNmbr = Number(guestsNumber.value);
    if (roomsNmbr !== 100 && guestsNmbr === 0) {
      guestsNumber.setCustomValidity('Гостей должно быть больше 0');
    } else if (guestsNmbr > roomsNmbr) {
      guestsNumber.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (roomsNmbr === 100 && guestsNmbr !== 0) {
      guestsNumber.setCustomValidity('В выбранном типе жилья гостей быть не должно');
    } else {
      guestsNumber.setCustomValidity('');
    }
  });

  roomsNumber.addEventListener('change', function () {
    var roomsNmbr = Number(roomsNumber.value);
    var guestsNmbr = Number(guestsNumber.value);
    if (roomsNmbr !== 100 && guestsNmbr === 0) {
      guestsNumber.setCustomValidity('Гостей должно быть больше 0');
    } else if (guestsNmbr > roomsNmbr) {
      guestsNumber.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (roomsNmbr === 100 && guestsNmbr !== 0) {
      guestsNumber.setCustomValidity('В выбранном типе жилья гостей быть не должно');
    } else {
      guestsNumber.setCustomValidity('');
    }
  });

  window.form = {
    enableAdFields: enableAdFields,
    enableFilterFields: enableFilterFields,
    setAddress: setAddress
  };
})();

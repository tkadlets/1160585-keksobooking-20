'use strict';

// вкл неактивный режим формы:
(function () {
  var disableFields = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].setAttribute('disabled', true);
    }
  };

  var adFormFields = document.querySelectorAll('.ad-form input, .ad-form select');
  var filtersFormFields = document.querySelectorAll('.map__filters input, .map__filters select');

  disableFields(adFormFields);
  disableFields(filtersFormFields);

  // вкл активный режим формы
  var enableFields = function (formFields) {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].removeAttribute('disabled');
    }
  };

  var enableAdFields = function () {
    enableFields(adFormFields);
  };

  var enableFilterFields = function () {
    enableFields(filtersFormFields);
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


  var guestsField = document.querySelector('#capacity');
  var roomsField = document.querySelector('#room_number');
  guestsField.addEventListener('change', function () {
    var roomsNumber = Number(roomsField.value);
    var guestsNumber = Number(guestsField.value);
    if (roomsNumber !== 100 && guestsNumber === 0) {
      guestsField.setCustomValidity('Гостей должно быть больше 0');
    } else if (guestsNumber > roomsNumber) {
      guestsField.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (roomsNumber === 100 && guestsNumber !== 0) {
      guestsField.setCustomValidity('В выбранном типе жилья гостей быть не должно');
    } else {
      guestsField.setCustomValidity('');
    }
  });

  roomsField.addEventListener('change', function () {
    var roomsNumber = Number(roomsField.value);
    var guestsNumber = Number(guestsField.value);
    if (roomsNumber !== 100 && guestsNumber === 0) {
      guestsField.setCustomValidity('Гостей должно быть больше 0');
    } else if (guestsNumber > roomsNumber) {
      guestsField.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (roomsNumber === 100 && guestsNumber !== 0) {
      guestsField.setCustomValidity('В выбранном типе жилья гостей быть не должно');
    } else {
      guestsField.setCustomValidity('');
    }
  });

  window.form = {
    enableAdFields: enableAdFields,
    enableFilterFields: enableFilterFields,
    setAddress: setAddress
  };
})();

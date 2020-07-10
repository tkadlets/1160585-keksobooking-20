'use strict';

// создаем мок данные
var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.floor(randomNumber);
};

var generateRandomBoolean = function () {
  var randomBoolean = Math.random() >= 0.5;
  return randomBoolean;
};

var generateData = function () {
  var mockData = [];

  var titles = ['Квартира в центре', 'Квартира на окраине', 'Комната с видом', 'Комната без вида', 'Лакшери апарты', 'Апарты без ремонта', 'Уютный лофт', 'Неуютный лофт'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var descriptions = ['Lorem ipsum dolor sit', 'Amet, consectetur adipiscing elit', 'Sed do eiusmod tempor incididunt', 'Ut labore et dolore magna aliqua', 'Excepteur sint occaecat cupidatat non proident', 'Sunt in culpa qui officia deserunt', 'Mollit anim id est laborum', 'Ipsum dolor sit consectetur laborum'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  for (var i = 0; i < 8; i++) {
    mockData[i] = {};

    var autorAvatars = [];
    autorAvatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
    mockData[i].author = {};
    mockData[i].author.avatar = autorAvatars[i];

    mockData[i].location = {};
    mockData[i].location.x = generateRandomNumber(130, 630);
    mockData[i].location.y = generateRandomNumber(130, 630 - 70);

    mockData[i].offer = {};
    mockData[i].offer.title = titles[i];
    var addressX = mockData[i].location.x;
    var addressY = mockData[i].location.y;
    mockData[i].offer.address = addressX + ', ' + addressY;
    mockData[i].offer.price = generateRandomNumber(1000, 10000);
    mockData[i].offer.type = types[generateRandomNumber(0, types.length)];
    mockData[i].offer.rooms = generateRandomNumber(1, 10);
    mockData[i].offer.guests = generateRandomNumber(1, 10);
    mockData[i].offer.checkin = checkins[generateRandomNumber(0, checkins.length)];
    mockData[i].offer.checkout = checkouts[generateRandomNumber(0, checkouts.length)];

    mockData[i].offer.features = [];
    for (var j = 0; j < features.length; j++) {
      var booleanFeature = generateRandomBoolean();
      if (booleanFeature) {
        mockData[i].offer.features.push(features[j]);
      }
    }

    mockData[i].offer.description = descriptions[generateRandomNumber(0, descriptions.length)];

    mockData[i].offer.photos = [];
    for (var h = 0; h < photos.length; h++) {
      var booleanPhoto = generateRandomBoolean();
      if (booleanPhoto) {
        mockData[i].offer.photos.push(photos[h]);
      }
    }
  }

  return mockData;
};

var mockData = generateData();


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


// отрисовка похожих объявлений
var embedPins = function (adsData) {
  var pinFragment = createPins(adsData);
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(pinFragment);
};


// неактивный режим страницы:
// вызов метода отрисовки похожих объявлений нужно перенести в функцию активации && mousedown на .map__pin--main активирует страницу
// && элементы управления формы (input, select и т. д.) должны быть неактивны в исходном состоянии - добавить через DOM-операции самим полям или fieldset, которые их содержат, атрибут disabled
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

// переключаемся в активный режим
var activatePage = function () {
  embedPins(mockData);

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  var adFormFields = document.querySelectorAll('.ad-form input, .ad-form select');
  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].removeAttribute('disabled');
  }

  var filtersFormFields = document.querySelectorAll('.map__filters input, .map__filters select');
  for (var j = 0; j < filtersFormFields.length; j++) {
    filtersFormFields[j].removeAttribute('disabled');
  }
};

// заполняем адрес

var setAddress = function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');
  if (map.classList.contains('map--faded')) {
    var mainPinLocationX = parseInt(mainPin.style.left, 10) + (parseInt(mainPin.offsetWidth, 10) / 2);
    var mainPinLocationY = parseInt(mainPin.style.top, 10) + (parseInt(mainPin.offsetWidth, 10) / 2);
  } else {
    mainPinLocationX = parseInt(mainPin.style.left, 10) + (parseInt(mainPin.offsetWidth, 10) / 2);
    mainPinLocationY = parseInt(mainPin.style.top, 10) + (parseInt(mainPin.offsetWidth, 10));
  }
  addressField.value = Math.round(mainPinLocationX) + ', ' + Math.round(mainPinLocationY);
};

setAddress();

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    setAddress();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
    setAddress();
  }
});


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
var syncByCheckIn = function () {
  checkOutTime.value = checkInTime.value;
};
var syncByCheckOut = function () {
  checkInTime.value = checkOutTime.value;
};

checkInTime.addEventListener('change', function () {
  syncByCheckIn();
});

checkOutTime.addEventListener('change', function () {
  syncByCheckOut();
});


var guestsNumber = document.querySelector('#capacity');
var roomsNumber = document.querySelector('#room_number');
guestsNumber.addEventListener('change', function () {
  if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
    guestsNumber.setCustomValidity('Гостей должно быть больше 0');
  } else if (roomsNumber.value < '100' && guestsNumber.value > roomsNumber.value) {
    guestsNumber.setCustomValidity('Гостей не может быть больше, чем комнат');
  } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
    guestsNumber.setCustomValidity('В выбранном типе жилья гостей быть не должно');
  } else {
    guestsNumber.setCustomValidity('');
  }
});

roomsNumber.addEventListener('change', function () {
  if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
    guestsNumber.setCustomValidity('Гостей должно быть больше 0');
  } else if (roomsNumber.value < '100' && guestsNumber.value > roomsNumber.value) {
    guestsNumber.setCustomValidity('Гостей не может быть больше, чем комнат');
  } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
    guestsNumber.setCustomValidity('В выбранном типе жилья гостей быть не должно');
  } else {
    guestsNumber.setCustomValidity('');
  }
});

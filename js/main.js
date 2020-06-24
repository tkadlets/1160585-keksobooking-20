'use strict';

// создаем мок данные
var generateRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max - min);
  return Math.ceil(randomNumber);
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
    mockData[i].location.y = generateRandomNumber(130, 630);

    mockData[i].offer = {};
    mockData[i].offer.title = titles[i];
    var addressX = mockData[i].location.x;
    var addressY = mockData[i].location.y;
    mockData[i].offer.address = addressX + ', ' + addressY;
    mockData[i].offer.price = generateRandomNumber(1000, 10000);
    mockData[i].offer.type = types[generateRandomNumber(0, 3)];
    mockData[i].offer.rooms = generateRandomNumber(1, 10);
    mockData[i].offer.guests = generateRandomNumber(1, 10);
    mockData[i].offer.checkin = checkins[generateRandomNumber(0, 2)];
    mockData[i].offer.checkout = checkouts[generateRandomNumber(0, 2)];

    mockData[i].offer.features = [];
    for (var j = 1; j < 6; j++) {
      var booleanFeature = generateRandomBoolean();
      if (booleanFeature) {
        mockData[i].offer.features.push(features[j]);
      }
    }

    mockData[i].offer.description = descriptions[generateRandomNumber(0, 7)];

    mockData[i].offer.photos = [];
    for (var h = 1; h < 3; h++) {
      var booleanPhoto = generateRandomBoolean();
      if (booleanPhoto) {
        mockData[i].offer.photos.push(photos[h]);
      }
    }
  }

  return mockData;
};

var mockData = generateData();

// временно включаем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// создаем метки
var createPins = function () {
  var pinFragment = document.createDocumentFragment();
  var template = document.querySelector('#pin');
  for (var i = 0; i < 8; i++) {
    var pin = template.content.cloneNode(true);
    var img = pin.querySelector('img');
    img.src = mockData[i].author.avatar;
    img.alt = mockData[i].offer.title;
    var pinLeft = mockData[i].location.x + 25 + 'px';
    var pinTop = mockData[i].location.y + 70 + 'px';

    var mapPin = pin.querySelector('.map__pin');
    mapPin.style.left = pinLeft;
    mapPin.style.top = pinTop;

    pinFragment.appendChild(pin);
  }
  return pinFragment;
};

var pinFragment = createPins();

var embedPins = function () {
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(pinFragment);
};

embedPins();



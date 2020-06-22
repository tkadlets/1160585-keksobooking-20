'use strict';

// создаем мок дынные
var mockData = [];

var titles = ['Квартира в центре', 'Квартира на окраине', 'Комната с видом', 'Комната без вида', 'Лакшери апарты', 'Апарты без ремонта', 'Уютный лофт', 'Неуютный лофт'];
var addresses = ['600, 500', '620, 300', '530, 540', '210, 700', '300, 120', '110, 550', '200, 400', '350, 440'];
var prices = [5000, 3000, 4000, 2000, 3300, 5500, 4400, 2200];
var types = ['palace', 'flat', 'house', 'bungalo', 'house', 'flat', 'palace', 'flat'];
var checkins = ['13:00', '14:00', '14:00', '13:00', '14:00', '14:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00', '12:00', '13:00', '14:00', '12:00', '13:00'];
var features = [['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'parking', 'washer', 'elevator'],
  ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'],
  ['wifi', 'dishwasher', 'parking', 'washer'],
  ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'dishwasher', 'parking', 'washer'],
  ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner']];
var descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'];
var photos = [['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg']];

for (var i = 0; i < 8; i++) {
  mockData[i] = {};

  var autorAvatars = [];
  autorAvatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  mockData[i].author = {};
  mockData[i].author.avatar = autorAvatars[i];

  mockData[i].offer = {};
  mockData[i].offer.title = titles[i];
  mockData[i].offer.address = addresses[i];
  mockData[i].offer.price = prices[i];
  mockData[i].offer.type = types[i];
  mockData[i].offer.rooms = Math.ceil(Math.random() * 10);
  mockData[i].offer.guests = Math.ceil(Math.random() * 10);
  mockData[i].offer.checkin = checkins[i];
  mockData[i].offer.checkout = checkouts[i];
  mockData[i].offer.features = features[i];
  mockData[i].offer.description = descriptions[i];
  mockData[i].offer.photos = photos[i];

  mockData[i].location = {};
  var locationsX = [];
  locationsX[i] = Math.round(Math.random() * (630 - 130) + 130);
  mockData[i].location.x = locationsX[i];
  var locationsY = [];
  locationsY[i] = Math.round(Math.random() * (630 - 130) + 130) - 70;
  mockData[i].location.y = locationsY[i];
}

// временно включаем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// создаем метки
var pinFragment = document.createDocumentFragment();
var template = document.querySelector('#pin');
for (var j = 0; j < 8; j++) {
  var pin = template.content.cloneNode(true);
  var img = pin.querySelector('img');
  img.src = mockData[j].author.avatar;
  img.alt = mockData[j].offer.title;
  var pinLeft = mockData[j].location.x + 25 + 'px';
  var pinTop = mockData[j].location.y + 70 + 'px';

  var mapPin = pin.querySelector('.map__pin');
  mapPin.style.left = pinLeft;
  mapPin.style.top = pinTop;

  pinFragment.appendChild(pin);
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(pinFragment);

'use strict';

// создаем мок данные
(function () {
  var TITLES = ['Квартира в центре', 'Квартира на окраине', 'Комната с видом', 'Комната без вида', 'Лакшери апарты', 'Апарты без ремонта', 'Уютный лофт', 'Неуютный лофт'];
    var TYPES = ['palace', 'flat', 'house', 'bungalo'];
    var CHECKINS = ['12:00', '13:00', '14:00'];
    var CHECKOUTS = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var DESCRIPTIONS = ['Lorem ipsum dolor sit', 'Amet, consectetur adipiscing elit', 'Sed do eiusmod tempor incididunt', 'Ut labore et dolore magna aliqua', 'Excepteur sint occaecat cupidatat non proident', 'Sunt in culpa qui officia deserunt', 'Mollit anim id est laborum', 'Ipsum dolor sit consectetur laborum'];
    var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generateData = function () {
    var mockData = [];

    for (var i = 0; i < 8; i++) {
      mockData[i] = {};

      var autorAvatars = [];
      autorAvatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
      mockData[i].author = {};
      mockData[i].author.avatar = autorAvatars[i];

      mockData[i].location = {};
      mockData[i].location.x = window.utils.generateRandomNumber(130, 630);
      mockData[i].location.y = window.utils.generateRandomNumber(130, 630 - 70);

      mockData[i].offer = {};
      mockData[i].offer.title = TITLES[i];
      var addressX = mockData[i].location.x;
      var addressY = mockData[i].location.y;
      mockData[i].offer.address = addressX + ', ' + addressY;
      mockData[i].offer.price = window.utils.generateRandomNumber(1000, 10000);
      mockData[i].offer.type = TYPES[window.utils.generateRandomNumber(0, TYPES.length)];
      mockData[i].offer.rooms = window.utils.generateRandomNumber(1, 10);
      mockData[i].offer.guests = window.utils.generateRandomNumber(1, 10);
      mockData[i].offer.checkin = CHECKINS[window.utils.generateRandomNumber(0, CHECKINS.length)];
      mockData[i].offer.checkout = CHECKOUTS[window.utils.generateRandomNumber(0, CHECKOUTS.length)];

      mockData[i].offer.features = [];
      for (var j = 0; j < FEATURES.length; j++) {
        var booleanFeature = window.utils.generateRandomBoolean();
        if (booleanFeature) {
          mockData[i].offer.features.push(FEATURES[j]);
        }
      }

      mockData[i].offer.description = DESCRIPTIONS[window.utils.generateRandomNumber(0, DESCRIPTIONS.length)];

      mockData[i].offer.photos = [];
      for (var h = 0; h < PHOTOS.length; h++) {
        var booleanPhoto = window.utils.generateRandomBoolean();
        if (booleanPhoto) {
          mockData[i].offer.photos.push(PHOTOS[h]);
        }
      }
    }

    return mockData;
  };

  var mockData = generateData();

  window.data = {
    mockData: mockData
  };
})();

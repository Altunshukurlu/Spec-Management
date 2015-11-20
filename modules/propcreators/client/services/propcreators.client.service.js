'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('propcreators').factory('Propcreators', ['$resource',
  function ($resource) {
    return $resource('api/propcreators/:propCId', {
      propCId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

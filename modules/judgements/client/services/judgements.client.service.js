'use strict';

//Judgements service used for communicating with the things REST endpoints
angular.module('judgements').factory('Judgements', ['$resource',
  function ($resource) {
    return $resource('api/judgements/:judgementId', {
      judgementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

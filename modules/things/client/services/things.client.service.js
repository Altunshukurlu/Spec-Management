'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('propositions').factory('Propositions', ['$resource',
  function ($resource) {
    return $resource('api/propositions/:propId', {
      propId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

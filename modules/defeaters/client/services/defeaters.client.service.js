'use strict';

//Defeaters service used for communicating with thearguments REST endpoints
angular.module('defeaters').factory('Defeaters', ['$resource',
  function ($resource) {
    return $resource('api/defeaters/:defeaterId', {
      defeaterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

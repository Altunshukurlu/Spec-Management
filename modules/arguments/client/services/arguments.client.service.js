'use strict';

//Arguments service used for communicating with thearguments REST endpoints
angular.module('arguments').factory('Arguments', ['$resource',
  function ($resource) {
    return $resource('api/arguments/:argumentId', {
      argumentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

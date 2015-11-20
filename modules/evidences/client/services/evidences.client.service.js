'use strict';

//Evidences service used for communicating with the evidences REST endpoints
angular.module('evidences').factory('Evidences', ['$resource',
  function ($resource) {
    return $resource('api/evidences/:evidenceId', {
      evidenceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('propcreators').factory('PropcreatorFactory', ['$resource',
  function($resource) {
    return {
      creator: $resource('api/propcreators/:propCId', {
        propCId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/propcreators/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

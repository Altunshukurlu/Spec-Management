'use strict';

//Things service used for communicating with the things REST endpoints
angular.module('things').factory('ThingFactory', ['$resource',
  function($resource) {
    return {
      thing: $resource('api/things/:thingId', {
        thingId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/things/project/:projectId', {
        projectID: '@_id'
      })
    };
  }
]);

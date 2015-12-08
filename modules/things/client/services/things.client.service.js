
'use strict';

//Things service used for communicating with the things REST endpoints
angular.module('things').factory('Things', ['$resource',
  function ($resource) {
    return {
      Things: $resource('api/things/:thingId', { thingId: '@_id' }, {
        update: { method: 'PUT' } }),
      ThingsByProject:
      $resource('api/things/thingsByProjectId/:projectId', {
        projectID: '@_id' })
    };
  }
]);

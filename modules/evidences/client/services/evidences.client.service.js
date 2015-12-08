'use strict';

//Evidences service used for communicating with the evidences REST endpoints
angular.module('evidences').factory('Evidences', ['$resource',
  function($resource) {
    return {
      Evidence: $resource('api/evidences/:evidenceId', {
        evidenceId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      Project: $resource('api/evidences/project/:projectId', {
        projectId: '@_id'
      }),
    };
  }
]);

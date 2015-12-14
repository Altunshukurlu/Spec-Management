'use strict';

//Evidencetypes service used for communicating with the evidencetypes REST endpoints
angular.module('evidencetypes').factory('EvidencetypeFactory', ['$resource',
  function($resource) {
    return {
      evidencetype: $resource('api/evidencetypes/:evidencetypeId', {
        evidencetypeId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/evidencetypes/project/:projectId', {
        projectID: '@_id'
      })
    };
  }
]);

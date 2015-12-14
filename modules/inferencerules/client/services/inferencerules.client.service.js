'use strict';

//Inferencerules service used for communicating with the inferencerules REST endpoints
angular.module('inferencerules').factory('InferenceruleFactory', ['$resource',
  function($resource) {
    return {
      inferencerule: $resource('api/inferencerules/:inferenceruleId', {
        inferenceruleId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/inferencerules/project/:projectId', {
        projectID: '@_id'
      })
    };
  }
]);

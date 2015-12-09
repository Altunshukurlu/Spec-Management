'use strict';

//Propositions service used for communicating with the propositions REST endpoints
angular.module('propositions').factory('PropositionFactory', ['$resource',
  function($resource) {
    return {
      proposition: $resource('api/propositions/:propositionId', {
        propositionId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/propositions/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

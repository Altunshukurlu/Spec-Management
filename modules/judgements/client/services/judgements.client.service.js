'use strict';

//Judgements service used for communicating with the things REST endpoints
angular.module('judgements').factory('JudgementFactory', ['$resource',
  function($resource) {
    return {
      judgement: $resource('api/judgements/:judgementId', {
        judgementId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      }),
      project: $resource('api/judgements/project/:projectId', {
        projectId: '@_id'
      })
    };
  }
]);

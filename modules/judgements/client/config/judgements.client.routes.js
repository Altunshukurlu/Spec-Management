

'use strict';

// Setting up route
angular.module('judgements').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('judgements', {
        abstract: true,
        url: '/judgements',
        template: '<ui-view/>'
      })
      .state('judgements.list', {
        url: '',
        templateUrl: 'modules/judgements/client/views/list-judgement.client.view.html'
      })
      .state('judgements.create', {
        url: '/create',
        templateUrl: 'modules/judgements/client/views/create-judgement.client.view.html'
      })
      .state('judgements.view', {
        url: '/:judgementId',
        templateUrl: 'modules/judgements/client/views/view-judgement.client.view.html'
      })
      .state('judgements.edit', {
        url: '/:judgementId/edit',
        templateUrl: 'modules/judgements/client/views/edit-judgement.client.view.html'
      });
      
  }
]);

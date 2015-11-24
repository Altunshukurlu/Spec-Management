'use strict';

// Setting up route
angular.module('propositions').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('propositions', {
        abstract: true,
        url: '/propositions',
        template: '<ui-view/>'
      })
      .state('propositions.list', {
        url: '',
        templateUrl: 'modules/propositions/client/views/list-proposition.client.view.html'
      })
      .state('propositions.create', {
        url: '/create',
        templateUrl: 'modules/propositions/client/views/create-proposition.client.view.html'
      })
      .state('propositions.view', {
        url: '/:propositionId',
        templateUrl: 'modules/propositions/client/views/view-proposition.client.view.html'
      })
      .state('propositions.edit', {
        url: '/:propositionId/edit',
        templateUrl: 'modules/propositions/client/views/edit-proposition.client.view.html'
      });
  }
]);

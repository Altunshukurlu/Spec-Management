'use strict';

// Setting up route
angular.module('defeaters').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('defeaters', {
        abstract: true,
        url: '/defeaters',
        template: '<ui-view/>'
      })
      .state('defeaters.list', {
        url: '',
        templateUrl: 'modules/defeaters/client/views/list-defeater.client.view.html'
      })
      .state('defeaters.create', {
        url: '/create',
        templateUrl: 'modules/defeaters/client/views/create-defeater.client.view.html'
      })
      .state('defeaters.view', {
        url: '/:defeaterId',
        templateUrl: 'modules/defeaters/client/views/view-defeater.client.view.html'
      })
      .state('defeaters.edit', {
        url: '/:defeaterId/edit',
        templateUrl: 'modules/defeaters/client/views/edit-defeater.client.view.html'
      });
  }
]);

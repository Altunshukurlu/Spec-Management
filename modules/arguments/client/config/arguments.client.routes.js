'use strict';

// Setting up route
angular.module('arguments').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('arguments', {
        abstract: true,
        url: '/arguments',
        template: '<ui-view/>'
      })
      .state('arguments.list', {
        url: '',
        templateUrl: 'modules/arguments/client/views/list-argument.client.view.html'
      })
      .state('arguments.create', {
        url: '/create',
        templateUrl: 'modules/arguments/client/views/create-argument.client.view.html'
      })
      .state('arguments.view', {
        url: '/:argumentId',
        templateUrl: 'modules/arguments/client/views/view-argument.client.view.html'
      })
      .state('arguments.edit', {
        url: '/:argumentId/edit',
        templateUrl: 'modules/arguments/client/views/edit-argument.client.view.html'
      });
  }
]);

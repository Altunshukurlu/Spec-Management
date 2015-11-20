'use strict';

// Setting up route
angular.module('things').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('things', {
        abstract: true,
        url: '/things',
        template: '<ui-view/>'
      })
      .state('things.list', {
        url: '',
        templateUrl: 'modules/things/client/views/list-thing.client.view.html'
      })
      .state('things.create', {
        url: '/create',
        templateUrl: 'modules/things/client/views/create-thing.client.view.html'
      })
      .state('things.view', {
        url: '/:thingId',
        templateUrl: 'modules/things/client/views/view-thing.client.view.html'
      })
      .state('things.edit', {
        url: '/:thingId/edit',
        templateUrl: 'modules/things/client/views/edit-thing.client.view.html'
      });
  }
]);

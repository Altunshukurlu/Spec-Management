'use strict';

// Setting up route
angular.module('propcreators').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('propcreators', {
        abstract: true,
        url: '/propcreators',
        template: '<ui-view/>'
      })
      .state('propcreators.list', {
        url: '',
        templateUrl: 'modules/propcreators/client/views/list-propcreator.client.view.html'
      })
      .state('propcreators.create', {
        url: '/create',
        templateUrl: 'modules/propcreators/client/views/create-propcreator.client.view.html'
      })
      .state('propcreators.view', {
        url: '/:propCId',
        templateUrl: 'modules/propcreators/client/views/view-propcreator.client.view.html'
      })
      .state('propcreators.edit', {
        url: '/:propCId/edit',
        templateUrl: 'modules/propcreators/client/views/edit-propcreator.client.view.html'
      });
  }
]);

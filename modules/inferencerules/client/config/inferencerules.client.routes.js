'use strict';

// Setting up route
angular.module('inferencerules').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('inferencerules', {
        abstract: true,
        url: '/inferencerules',
        template: '<ui-view/>'
      })
      .state('inferencerules.list', {
        url: '',
        templateUrl: 'modules/inferencerules/client/views/list-inferencerules.client.view.html'
      })
      .state('inferencerules.create', {
        url: '/create',
        templateUrl: 'modules/inferencerules/client/views/create-inferencerule.client.view.html'
      })
      .state('inferencerules.view', {
        url: '/:inferenceruleId',
        templateUrl: 'modules/inferencerules/client/views/view-inferencerule.client.view.html'
      })
      .state('inferencerules.edit', {
        url: '/:inferenceruleId/edit',
        templateUrl: 'modules/inferencerules/client/views/edit-inferencerule.client.view.html'
      });
  }
]);

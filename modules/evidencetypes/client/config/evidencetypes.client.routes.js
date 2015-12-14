'use strict';

// Setting up route
angular.module('evidencetypes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('evidencetypes', {
        abstract: true,
        url: '/evidencetypes',
        template: '<ui-view/>'
      })
      .state('evidencetypes.list', {
        url: '',
        templateUrl: 'modules/evidencetypes/client/views/list-evidencetypes.client.view.html'
      })
      .state('evidencetypes.create', {
        url: '/create',
        templateUrl: 'modules/evidencetypes/client/views/create-evidencetype.client.view.html'
      })
      .state('evidencetypes.view', {
        url: '/:evidencetypeId',
        templateUrl: 'modules/evidencetypes/client/views/view-evidencetype.client.view.html'
      })
      .state('evidencetypes.edit', {
        url: '/:evidencetypeId/edit',
        templateUrl: 'modules/evidencetypes/client/views/edit-evidencetype.client.view.html'
      });
  }
]);

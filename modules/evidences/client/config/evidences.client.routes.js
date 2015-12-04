'use strict';

// Setting up route
angular.module('evidences').config(['$stateProvider',
  function ($stateProvider) {
    // Evidences state routing
    $stateProvider
      .state('evidences', {
        abstract: true,
        url: '/evidences',
        template: '<ui-view/>'
      })
      .state('evidences.list', {
        url: '',
        templateUrl: 'modules/evidences/client/views/list-evidences.client.view.html'
      })
      .state('evidences.create', {
        url: '/create',
        templateUrl: 'modules/evidences/client/views/create-evidence.client.view.html',
        //data: {
        //  roles: ['user', 'admin']
        //}
      })
      .state('evidences.view', {
        url: '/:evidenceId',
        templateUrl: 'modules/evidences/client/views/view-evidence.client.view.html'
      })
      .state('evidences.edit', {
        url: '/:evidenceId/edit',
        templateUrl: 'modules/evidences/client/views/edit-evidence.client.view.html',
        //data: {
        //  roles: ['user', 'admin']
        //}
      });
  }
]);

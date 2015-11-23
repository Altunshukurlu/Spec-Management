'use strict';

// Setting up route
angular.module('projects').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('projects', {
        abstract: true,
        url: '/projects',
        template: '<ui-view/>'
      })
      .state('projects.list', {
        url: '',
        templateUrl: 'modules/projects/client/views/list-project.client.view.html'
      })
      .state('projects.create', {
        url: '/create',
        templateUrl: 'modules/projects/client/views/create-project.client.view.html'
      })
      .state('projects.view', {
        url: '/:projId',
        templateUrl: 'modules/projects/client/views/view-project.client.view.html'
      })
      .state('projects.edit', {
        url: '/:projId/edit',
        templateUrl: 'modules/projects/client/views/edit-project.client.view.html'
      });
  }
]);

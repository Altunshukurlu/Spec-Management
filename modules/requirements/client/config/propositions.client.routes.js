'use strict';

// Setting up route
angular.module('propositions').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('requirements', {
        abstract: true,
        url: '/requirements',
        template: '<ui-view/>'
      })
      .state('requirements.propositions', {
        url: '/propositions',
        templateUrl: 'modules/requirements/client/views/list-proposition.client.view.html'
      })
      .state('requirements.propositionscreate', {
        url: '/propositions/create',
        templateUrl: 'modules/requirements/client/views/create-proposition.client.view.html'
      })
      .state('requirements.propositionsview', {
        url: '/propositions/:articleId',
        templateUrl: 'modules/requirements/client/views/view-proposition.client.view.html'
      })
      .state('requirements.propositionsedit', {
        url: '/propositions/:articleId/edit',
        templateUrl: 'modules/requirements/client/views/edit-proposition.client.view.html',
      })
      .state('requirements.things', {
        url: '/things',
        templateUrl: 'modules/requirements/client/views/list-thing.client.view.html'
      });
  }
]);

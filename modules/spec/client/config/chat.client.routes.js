'use strict';

// Configure the 'chat' module routes
angular.module('spec').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('spec', {
        url: '/spec',
        templateUrl: 'modules/spec/client/views/chat.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);

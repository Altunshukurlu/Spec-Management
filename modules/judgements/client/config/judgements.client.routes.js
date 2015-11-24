'use strict';

// Setting up route
angular.module('judgements').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('judgements', {
        abstract: true,
        url: '/judgements',
        template: '<ui-view/>'
      });
      
  }
]);

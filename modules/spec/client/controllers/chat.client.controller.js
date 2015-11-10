'use strict';

// Create the 'chat' controller
angular.module('spec').controller('SpecController', ['$scope',
  function ($scope) {
    //////////////////////The Spec Part//////////////////////
    $scope.propertyName = 'Resilience';

    $scope.sendPName = function(){
      $scope.propertyName = this.pName;
      this.pName = '';
    };
  }
]);

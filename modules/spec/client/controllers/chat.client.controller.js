'use strict';

// Create the 'chat' controller
angular.module('spec').controller('SpecController', ['$scope',
  function ($scope) {
    //////////////////////The Spec Part//////////////////////
    $scope.propertyList = ['Resilience'];

    $scope.sendPName = function(){
      $scope.propertyList.push(this.pName);
      this.pName = '';
    };
  }
]);

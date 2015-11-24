'use strict';

// Propositions controller
angular.module('propositions').controller('PropositionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Propositions', 'Things', 'Propcreators',
  function ($scope, $stateParams, $location, Authentication, Propositions, Things) {
    $scope.authentication = Authentication;
    $scope.things = Things.query();
    console.log($scope.things);
    //$scope.propcreators = Propcreators.query();
    // Create new proposition
    $scope.create = function (isValid) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      // Create new Propositions object
      var proposition = new Propositions({
        title: this.title,
        thing: this.selectedThing
        //TODO: add others 
      });

      // Redirect after save
      proposition.$save(function (response) {
        $location.path('propositions/' + response._id);
        $scope.title = '';
        //$scope.selectedThing = null; 
        //TODO: add other forms field 
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing proposition 
    $scope.remove = function (proposition) {
      if (proposition) {
        proposition.$remove();
        for (var i in $scope.proposition) {
          if ($scope.propositions[i] === proposition) {
            $scope.propositions.splice(i, 1);
          }
        }
      } else {
        $scope.proposition.$remove(function () {
          $location.path('propositions');
        });
      }
    };

    // Update existing proposition
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      var proposition = $scope.proposition;

      proposition.$update(function () {
        $location.path('propositions/' + proposition._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of propositions 
    $scope.find = function () { 
      $scope.propositions = Propositions.query();
      $scope.things = Things.query();
      console.log($scope.things);
      //console.log(propositions[0].title); 
      //console.log(Things.findById(propositions[0].thing)); 
    };

    // Find existing Propositions
    $scope.findOne = function () {
      $scope.proposition = Propositions.get({
        propositionId: $stateParams.propositionId
      });
      console.log('Altun===========================');
      $scope.things = Things.query();

      $scope.oneThing = {};
      angular.forEach($scope.things, function(obj){
        console.log(obj);
        if(obj._id === $stateParams.propositionId){
          $scope.oneThing = obj;
        }
      });
    };
  }
]);



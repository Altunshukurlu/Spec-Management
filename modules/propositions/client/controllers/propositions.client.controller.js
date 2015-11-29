
'use strict';

// Propositions controller
angular.module('propositions').controller('PropositionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Propositions', 'Things', 'Propcreators',
  function ($scope, $stateParams, $location, Authentication, Propositions, Things) {
    
    $scope.authentication = Authentication;
    $scope.things = Things.query();
    
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
        thing: this.selectedThing._id
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
      console.log('selectedThing: ' + $scope.selectedThing.title);
      var proposition = $scope.proposition;
      proposition.thing = $scope.selectedThing._id;
      var foundThing = false;
/*
      angular.forEach($scope.things, function(thing){
        if(!foundThing && (thing.title === $scope.selectedThing)){
          proposition.thing = thing._id;
          foundThing = true;
        }
      });
*/
      console.log('proposition thing: '+ proposition.thing);
      proposition.$update(function () {
        $location.path('propositions/' + proposition._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of propositions 
    $scope.find = function () { 
      $scope.propositions = Propositions.query(
/*
        function(callbackdata){
        var len = $scope.propositions.length; 
        $scope.thingsForPropositions = []; 
        var counter; 
        for(counter = 0; counter < len; counter++){
          $scope.thingsForPropositions[counter] = Things.get({
            thingId: $scope.propositions[counter].thing
          });
        }
        $scope.selectedThing = $scope.propositions[0];
      }*/
    );
    };

    // Find existing Propositions
    $scope.findOne = function () {
      $scope.proposition = Propositions.get({
        propositionId: $stateParams.propositionId
      }, function(resData){
        $scope.selectedThing = resData.thing.title;
      });
/*
,function(callbackdata){
        console.log($scope.proposition);
        console.log('thingId: ' + $scope.proposition.thing);
        $scope.thing = Things.get({
          thingId: $scope.proposition.thing
        });
      });
*/
    };
    
  }
]);



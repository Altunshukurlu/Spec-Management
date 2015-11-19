'use strict';

// Proposition controller
angular.module('propositions').controller('PropositionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Propositions',
  function ($scope, $stateParams, $location, Authentication, Propositions) {
    $scope.authentication = Authentication;

    // Create new proposition
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propForm');

        return false;
      }

      // Create new Proposition object
      var prop = new Propositions({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      prop.$save(function (response) {
        $location.path('requirements/propositions/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Proposition 
    $scope.remove = function (prop) {
      if (prop) {
        prop.$remove();
        for (var i in $scope.props) {
          if ($scope.props[i] === prop) {
            $scope.props.splice(i, 1); 
          }
        }
      } else {
        $scope.prop.$remove(function () {
          $location.path('requirements/propositions');
        });
      }   
    };  


    // Update existing Proposition
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propForm');

        return false;
      }

      var prop = $scope.prop;

      prop.$update(function () {
        $location.path('requirements/propositions/' + prop._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Propositions 
    $scope.find = function () { 
      $scope.props = Propositions.query();
    };

    // Find existing Propositions
    $scope.findOne = function () {
      $scope.prop = Propositions.get({
        propId: $stateParams.propId
      });
    };
  }
]);

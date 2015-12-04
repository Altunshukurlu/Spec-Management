
'use strict';

// Arguments controller
angular.module('arguments').controller('ArgumentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Arguments',
  function ($scope, $stateParams, $location, Authentication, Arguments) {
    $scope.authentication = Authentication;

    // Create new argument
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'argumentForm');

        return false;
      }

      // Create new Arguments object
      var argument = new Arguments({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      argument.$save(function (response) {
        $location.path('arguments/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing argument
    $scope.remove = function (argument) {
      if (argument) {
        argument.$remove();
        for (var i in $scope.argument) {
          if ($scope.arguments[i] === argument) {
            $scope.arguments.splice(i, 1);
          }
        }
      } else {
        $scope.argument.$remove(function () {
          $location.path('arguments');
        });
      }
    };

    // Update existing Argument
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'argumentForm');

        return false;
      }

      var argument = $scope.argument;

      argument.$update(function () {
        $location.path('arguments/' + argument._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Arguments
    $scope.find = function () {
      $scope.arguments = Arguments.query();
    };

    // Find existing Arguments
    $scope.findOne = function () {
      $scope.argument = Arguments.get({
        argumentId: $stateParams.argumentId
      });
    };
  }
]);

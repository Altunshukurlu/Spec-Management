
'use strict';

// Defeaters controller
angular.module('defeaters').controller('DefeatersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Defeaters',
  function ($scope, $stateParams, $location, Authentication, Defeaters) {
    $scope.authentication = Authentication;

    // Create new defeater
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'defeaterForm');

        return false;
      }

      // Create new Defeaters object
      var defeater = new Defeaters({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      defeater.$save(function (response) {
        $location.path('defeaters/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing defeater
    $scope.remove = function (defeater) {
      if (defeater) {
        defeater.$remove();
        for (var i in $scope.defeater) {
          if ($scope.defeaters[i] === defeater) {
            $scope.defeaters.splice(i, 1);
          }
        }
      } else {
        $scope.defeater.$remove(function () {
          $location.path('defeaters');
        });
      }
    };

    // Update existing Defeater
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'defeaterForm');

        return false;
      }

      var defeater = $scope.defeater;

      defeater.$update(function () {
        $location.path('defeaters/' + defeater._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Defeaters
    $scope.find = function () {
      $scope.defeaters = Defeaters.query();
    };

    // Find existing Defeaters
    $scope.findOne = function () {
      $scope.defeater = Defeaters.get({
        defeaterId: $stateParams.defeaterId
      });
    };
  }
]);

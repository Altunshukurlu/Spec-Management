'use strict';

// Evidences controller
angular.module('evidences').controller('EvidencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Evidences',
  function ($scope, $stateParams, $location, Authentication, Evidences) {
    $scope.authentication = Authentication;

    // Create new Evidence
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }

      // Create new Evidence object
      var evidence = new Evidences({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      evidence.$save(function (response) {
        $location.path('evidences/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Evidence
    $scope.remove = function (evidence) {
      if (evidence) {
        evidence.$remove();

        for (var i in $scope.evidences) {
          if ($scope.evidences[i] === evidence) {
            $scope.evidences.splice(i, 1);
          }
        }
      } else {
        $scope.evidence.$remove(function () {
          $location.path('evidences');
        });
      }
    };

    // Update existing Evidence
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }

      var evidence = $scope.evidence;

      evidence.$update(function () {
        $location.path('evidences/' + evidence._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Evidences
    $scope.find = function () {
      $scope.evidences = Evidences.query();
    };

    // Find existing Evidence
    $scope.findOne = function () {
      $scope.evidence = Evidences.get({
        evidenceId: $stateParams.evidenceId
      });
    };
  }
]);

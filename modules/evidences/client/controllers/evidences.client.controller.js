'use strict';

// Evidences controller
angular.module('evidences').controller('EvidencesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'EvidenceFactory',
  'CurProjectFactory',
  function($scope, $stateParams, $location, Authentication, EvidenceFactory,
    CurProjectFactory) {
    $scope.authentication = Authentication;
    $scope.projectId = CurProjectFactory.getProjId();

    // Create new Evidence
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }

      // Create new Evidence object
      var evidence = new EvidenceFactory.evidence({
        title: this.title,
        content: this.content,
        project: CurProjectFactory.getProjId()
      });

      // Redirect after save
      evidence.$save(function(response) {
        $location.path('evidences/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Evidence
    $scope.remove = function(evidence) {
      if (evidence) {
        evidence.$remove();

        for (var i in $scope.evidences) {
          if ($scope.evidences[i] === evidence) {
            $scope.evidences.splice(i, 1);
          }
        }
      } else {
        $scope.evidence.$remove(function() {
          $location.path('evidences');
        });
      }
    };

    // Update existing Evidence
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }

      var evidence = $scope.evidence;

      evidence.$update(function() {
        $location.path('evidences/' + evidence._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Evidences
    $scope.find = function() {
      $scope.evidences = EvidenceFactory.project.query({
        projectId: CurProjectFactory.getProjId()
      });
    };

    // Find existing Evidence
    $scope.findOne = function() {
      $scope.evidence = EvidenceFactory.evidence.get({
        evidenceId: $stateParams.evidenceId
      }, function() {
        //console.log($scope.evidence.project);
      });
    };
  }
]);

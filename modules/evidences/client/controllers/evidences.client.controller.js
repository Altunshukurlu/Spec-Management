'use strict';

// Evidences controller
angular.module('evidences').controller('EvidencesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'Evidences',
  'ProjectsForOtherModules',
  function($scope, $stateParams, $location, Authentication, Evidences,
    ProjectsForOtherModules) {
    $scope.authentication = Authentication;
    $scope.projectId = ProjectsForOtherModules.getProjId();
    //console.log($scope.projectId);
    // Create new Evidence
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidenceForm');

        return false;
      }

      // Create new Evidence object
      var evidence = new Evidences.Evidence({
        title: this.title,
        content: this.content,
        project: ProjectsForOtherModules.getProjId()
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
      $scope.evidences = Evidences.Project.query({
        projectId: ProjectsForOtherModules.getProjId()
      });
    };

    // Find existing Evidence
    $scope.findOne = function() {
      $scope.evidence = Evidences.Evidence.get({
        evidenceId: $stateParams.evidenceId
      }, function() {
        //console.log($scope.evidence.project);
      });
    };
  }
]);

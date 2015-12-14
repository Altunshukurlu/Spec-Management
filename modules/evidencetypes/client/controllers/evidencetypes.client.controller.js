'use strict';

// Evidencetypes controller
angular.module('evidencetypes').controller('EvidencetypesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'EvidencetypeFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication, EvidencetypeFactory,
    ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new evidencetype
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidencetypeForm');

        return false;
      }

      // Create new Evidencetypes object
      var evidencetype = new EvidencetypeFactory.evidencetype({
        title: this.title,
        content: this.content,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      evidencetype.$save(function(response) {
        $location.path('evidencetypes/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing evidencetype
    $scope.remove = function(evidencetype) {
      if (evidencetype) {
        evidencetype.$remove();
        for (var i in $scope.evidencetype) {
          if ($scope.evidencetypes[i] === evidencetype) {
            $scope.evidencetypes.splice(i, 1);
          }
        }
      } else {
        $scope.evidencetype.$remove(function() {
          $location.path('evidencetypes');
        });
      }
    };

    // Update existing Evidencetype
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'evidencetypeForm');
        return false;
      }

      var evidencetype = $scope.evidencetype;

      evidencetype.$update(function() {
        $location.path('evidencetypes/' + evidencetype._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Evidencetypes
    $scope.find = function() {
      $scope.evidencetypes = EvidencetypeFactory.project.query({
        projectId: ProjectFactory.getProjId()
      }, function() {});
    };

    // Find existing Evidencetypes
    $scope.findOne = function() {
      $scope.evidencetype = EvidencetypeFactory.evidencetype.get({
        evidencetypeId: $stateParams.evidencetypeId
      });
    };
  }
]);

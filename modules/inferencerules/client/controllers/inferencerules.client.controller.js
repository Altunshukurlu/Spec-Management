'use strict';

// Inferencerules controller
angular.module('inferencerules').controller('InferencerulesController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'InferenceruleFactory',
  'ProjectFactory',
  function($scope, $stateParams, $location, Authentication, InferenceruleFactory,
    ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new inferencerule
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'inferenceruleForm');

        return false;
      }

      // Create new Inferencerules object
      var inferencerule = new InferenceruleFactory.inferencerule({
        title: this.title,
        content: this.content,
        project: ProjectFactory.getProjId()
      });

      // Redirect after save
      inferencerule.$save(function(response) {
        $location.path('inferencerules/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing inferencerule
    $scope.remove = function(inferencerule) {
      if (inferencerule) {
        inferencerule.$remove();
        for (var i in $scope.inferencerule) {
          if ($scope.inferencerules[i] === inferencerule) {
            $scope.inferencerules.splice(i, 1);
          }
        }
      } else {
        $scope.inferencerule.$remove(function() {
          $location.path('inferencerules');
        });
      }
    };

    // Update existing Inferencerule
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'inferenceruleForm');
        return false;
      }

      var inferencerule = $scope.inferencerule;

      inferencerule.$update(function() {
        $location.path('inferencerules/' + inferencerule._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Inferencerules
    $scope.find = function() {
      $scope.inferencerules = InferenceruleFactory.project.query({
        projectId: ProjectFactory.getProjId()
      }, function() {});
    };

    // Find existing Inferencerules
    $scope.findOne = function() {
      $scope.inferencerule = InferenceruleFactory.inferencerule.get({
        inferenceruleId: $stateParams.inferenceruleId
      });
    };
  }
]);

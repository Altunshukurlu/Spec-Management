'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'ProjectFactory', 
  function($scope, $stateParams, $location, Authentication, ProjectFactory) {
    $scope.authentication = Authentication;

    // Create new project
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'proejctForm');

        return false;
      }

      // Create new Projects object
      var project = new ProjectFactory.project({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      project.$save(function(response) {
        $location.path('projects/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing project
    $scope.remove = function(project) {
      if (project) {
        project.$remove();
        for (var i in $scope.project) {
          if ($scope.projects[i] === project) {
            $scope.projects.splice(i, 1);
          }
        }
      } else {
        $scope.project.$remove(function() {
          // remove project information from service
          ProjectFactory.setCurProject({});
          ProjectFactory.setProjId('');
          $location.path('projects');
        });
      }
    };

    // Update existing Project
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'projectForm');

        return false;
      }

      var project = $scope.project;

      project.$update(function() {
        $location.path('projects/' + project._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Projects
    $scope.find = function() {
      $scope.projects = ProjectFactory.project.query();
    };

    // Find existing Projects
    $scope.findOne = function() {
      $scope.project = ProjectFactory.project.get({
        projId: $stateParams.projId
      }, function() {
        ProjectFactory.setCurProject($scope.project);
        // set the project id for other modules
        ProjectFactory.setProjId($scope.project._id);
      });
    };
  }
]);

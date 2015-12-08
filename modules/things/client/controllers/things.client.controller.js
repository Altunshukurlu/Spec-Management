'use strict';

// Things controller
angular.module('things').controller('ThingsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'Things',
  'ProjectsForOtherModules',
  function($scope, $stateParams, $location, Authentication, Things,
    ProjectsForOtherModules) {
    $scope.authentication = Authentication;

    // Create new thing
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'thingForm');

        return false;
      }

      // Create new Things object
      var thing = new Things.thing({
        title: this.title,
        content: this.content,
        project: ProjectsForOtherModules.getProjId()
      });

      // Redirect after save
      thing.$save(function(response) {
        $location.path('things/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing thing
    $scope.remove = function(thing) {
      if (thing) {
        thing.$remove();
        for (var i in $scope.thing) {
          if ($scope.things[i] === thing) {
            $scope.things.splice(i, 1);
          }
        }
      } else {
        $scope.thing.$remove(function() {
          $location.path('things');
        });
      }
    };

    // Update existing Thing
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'thingForm');

        return false;
      }

      var thing = $scope.thing;

      thing.$update(function() {
        $location.path('things/' + thing._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Things
    $scope.find = function() {
      $scope.things = Things.project.query({
        projectId: ProjectsForOtherModules.getProjId()
      }, function() {});
    };

    // Find existing Things
    $scope.findOne = function() {
      console.log('Chong Tang: In findOne()');
      $scope.thing = Things.thing.get({
        thingId: $stateParams.thingId
      });
    };
  }
]);

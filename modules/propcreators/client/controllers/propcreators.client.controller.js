'use strict';

// Propcreator controller
angular.module('propcreators').controller('PropcreatorsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'PropcreatorFactory',
  'CurProjectFactory',
  function($scope, $stateParams, $location, Authentication,
    PropcreatorFactory, CurProjectFactory) {
    $scope.authentication = Authentication;

    // Create new proposition creator
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propCreatorForm');

        return false;
      }

      // Create new Propcreator object
      var propCreator = new PropcreatorFactory.creator({
        title: this.title,
        project: CurProjectFactory.getProjId()
      });

      // Redirect after save
      propCreator.$save(function(response) {
        $location.path('propcreators/' + response._id);

        // Clear form fields
        $scope.title = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Propcreator
    $scope.remove = function(propCreator) {
      if (propCreator) {
        propCreator.$remove();
        for (var i in $scope.propCreators) {
          if ($scope.propCreators[i] === propCreator) {
            $scope.propCreators.splice(i, 1);
          }
        }
      } else {
        $scope.propCreator.$remove(function() {
          $location.path('propcreators');
        });
      }
    };


    // Update existing Propcreator
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propCreatorForm');

        return false;
      }

      var propCreator = $scope.propCreator;

      propCreator.$update(function() {
        $location.path('propcreators/' + propCreator._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Propcreators
    $scope.find = function() {
      $scope.propCreators = PropcreatorFactory.project.query({
        projectId: CurProjectFactory.getProjId()
      });
    };

    // Find existing Propcreators
    $scope.findOne = function() {
      $scope.propCreator = PropcreatorFactory.creator.get({
        propCId: $stateParams.propCId
      });
    };
  }
]);

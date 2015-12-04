

'use strict';

// Judgements controller
angular.module('judgements').controller('JudgementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Judgements',
  function ($scope, $stateParams, $location, Authentication, Judgements) {
    $scope.authentication = Authentication;

    // Create new judgement
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'judgementForm');

        return false;
      }

      // Create new Judgements object
      var judgement = new Judgements({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      judgement.$save(function (response) {
        $location.path('judgements/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    

    // Update existing Judgement
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'judgementForm');

        return false;
      }

      var judgement = $scope.judgement;

      judgement.$update(function () {
        $location.path('things/' + judgement._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Things 
    $scope.find = function () { 
      $scope.judgements = Judgements.query();
    };

    // Find existing Judgements
    $scope.findOne = function () {
      $scope.judgement = Judgements.get({
        judgementId: $stateParams.judgementId
      });
    };
  }
]);
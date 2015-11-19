'use strict';

// Articles controller
angular.module('propositions').controller('JudgementController', ['$scope', '$stateParams', '$location', 'Authentication', 'Propositions',
  function ($scope, $stateParams, $location, Authentication, Propositions) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Article object
      var article = new Propositions({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('requirements/propositions/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('requirements/propositions/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Propositions.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Propositions.get({
        propId: $stateParams.articleId
      });
    };
  }
]);

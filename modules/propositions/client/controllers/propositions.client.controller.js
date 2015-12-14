'use strict';

// Propositions controller
angular.module('propositions').controller('PropositionsController', ['$scope',
  '$stateParams', '$location', 'Authentication', 'ProjectFactory',
  'PropositionFactory', 'ThingFactory', 'PropcreatorFactory',
  'EvidenceFactory', 'JudgementFactory',
  function($scope, $stateParams, $location, Authentication,
    ProjectFactory, PropositionFactory, ThingFactory, PropcreatorFactory,
    EvidenceFactory, JudgementFactory) {
    $scope.authentication = Authentication;
    $scope.projectId = ProjectFactory.getProjId();
    $scope.things = ThingFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.creators = PropcreatorFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.judgements = JudgementFactory.project.query({
      projectId: $scope.projectId
    });
    $scope.evidences = EvidenceFactory.project.query({
      projectId: $scope.projectId
    });


    // Create new proposition
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      /* Chong: We don't have judgements stored in the database.
       * So, we cannot choose one on the page.
       * Instead, we give the thing id as judgement id here.
       */
      // Create new Propositions objectG
      var proposition = new PropositionFactory.proposition({
        title: this.title,
        type: 'Basic',
        thing: this.selectedThing._id,
        project: $scope.projectId,
        propcreator: this.selectedCreator._id,
        evidences: this.selectedEvidences._id,
        judgements: this.selectedThing._id /*Chong: Error*/
      });

      // Redirect after save
      proposition.$save(function(response) {
        $location.path('propositions/' + response._id);
        $scope.title = '';
        //$scope.selectedThing = null;
        //TODO: add other forms field
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Create new proposition
    $scope.createComposite = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      // Create new Propositions objectG
      var proposition = new PropositionFactory.proposition({
        title: this.title,
        firstProposition: this.selectedFirstProposition._id,
        secondProposition: this.selectedSecondProposition._id,
        type: 'Composite'
          //TODO: add others
      });

      // Redirect after save
      proposition.$save(function(response) {
        $location.path('propositions/' + response._id);
        $scope.title = '';
        //$scope.selectedThing = null;
        //TODO: add other forms field
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing proposition
    $scope.remove = function(proposition) {
      if (proposition) {
        proposition.$remove();
        for (var i in $scope.proposition) {
          if ($scope.propositions[i] === proposition) {
            $scope.propositions.splice(i, 1);
          }
        }
      } else {
        $scope.proposition.$remove(function() {
          $location.path('propositions');
        });
      }
    };

    // Update existing proposition
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      var proposition = $scope.proposition;
      proposition.thing = $scope.selectedThing._id;
      proposition.propcreator = $scope.selectedCreator._id;
      proposition.evidences = $scope.selectedEvidences._id;
      proposition.judgements = $scope.selectedJudgements._id;
      var foundThing = false;
      proposition.$update(function() {
        $location.path('propositions/' + proposition._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Update existing composite proposition
    $scope.updateComposite = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'propositionForm');
        return false;
      }

      var proposition = $scope.proposition;
      proposition.firstProposition = $scope.selectedFirstProposition._id;
      proposition.secondProposition = $scope.selectedSecondProposition._id;

      proposition.$update(function() {
        $location.path('propositions/composite-proposition/' +
          proposition._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Find a list of propositions
    $scope.find = function() {
      $scope.propositions = PropositionFactory.project.query({
        projectId: $scope.projectId
      });
    };

    // Find existing Propositions
    $scope.findOne = function() {
      $scope.proposition = PropositionFactory.proposition.get({
        propositionId: $stateParams.propositionId
      }, function(resData) {
        //$scope.selectedThing = resData.thing.title;
        //$scope.selectedCreator = resData.propcreator.title;
      });
    };

    $scope.viewPropositionByType = function(type) {
      if (type === 'Composite') {
        return
          'propositions.view-composite({propositionId: proposition._id})';
      } else {
        return 'propositions.view({propositionId: proposition._id})';
      }
    };
  }
]);

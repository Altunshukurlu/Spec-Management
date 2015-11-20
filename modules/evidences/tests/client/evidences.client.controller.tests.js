'use strict';

(function () {
  // Evidences Controller Spec
  describe('Evidences Controller Tests', function () {
    // Initialize global variables
    var EvidencesController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Evidences,
      mockEvidence;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Evidences_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Evidences = _Evidences_;

      // create mock evidence
      mockEvidence = new Evidences({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Evidence about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Evidences controller.
      EvidencesController = $controller('EvidencesController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one evidence object fetched from XHR', inject(function (Evidences) {
      // Create a sample evidences array that includes the new evidence
      var sampleEvidences = [mockEvidence];

      // Set GET response
      $httpBackend.expectGET('api/evidences').respond(sampleEvidences);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.evidences).toEqualData(sampleEvidences);
    }));

    it('$scope.findOne() should create an array with one evidence object fetched from XHR using a evidenceId URL parameter', inject(function (Evidences) {
      // Set the URL parameter
      $stateParams.evidenceId = mockEvidence._id;

      // Set GET response
      $httpBackend.expectGET(/api\/evidences\/([0-9a-fA-F]{24})$/).respond(mockEvidence);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.evidence).toEqualData(mockEvidence);
    }));

    describe('$scope.create()', function () {
      var sampleEvidencePostData;

      beforeEach(function () {
        // Create a sample evidence object
        sampleEvidencePostData = new Evidences({
          title: 'An Evidence about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Evidence about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Evidences) {
        // Set POST response
        $httpBackend.expectPOST('api/evidences', sampleEvidencePostData).respond(mockEvidence);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the evidence was created
        expect($location.path.calls.mostRecent().args[0]).toBe('evidences/' + mockEvidence._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/evidences', sampleEvidencePostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock evidence in scope
        scope.evidence = mockEvidence;
      });

      it('should update a valid evidence', inject(function (Evidences) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/evidences\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/evidences/' + mockEvidence._id);
      }));

      it('should set scope.error to error response message', inject(function (Evidences) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/evidences\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(evidence)', function () {
      beforeEach(function () {
        // Create new evidences array and include the evidence
        scope.evidences = [mockEvidence, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/evidences\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockEvidence);
      });

      it('should send a DELETE request with a valid evidenceId and remove the evidence from the scope', inject(function (Evidences) {
        expect(scope.evidences.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.evidence = mockEvidence;

        $httpBackend.expectDELETE(/api\/evidences\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to evidences', function () {
        expect($location.path).toHaveBeenCalledWith('evidences');
      });
    });
  });
}());

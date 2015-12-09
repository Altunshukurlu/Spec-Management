'use strict';

//Projects service used for communicating with the projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
  function($resource) {
    return $resource('api/projects/:projId', {
      projId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('projects').factory('CurProjectFactory', function() {
  var curProject = {};
  var projectId = '';
  return {
    setProjId: function(pId) {
      projectId = pId;
    },
    getProjId: function() {
      return projectId;
    },
    setCurProject: function(proj) {
      curProject = proj;
    },
    getCurProject: function() {
      return curProject;
    }
  };
});

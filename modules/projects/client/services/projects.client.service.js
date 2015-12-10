'use strict';

//Projects service used for communicating with the projects REST endpoints
angular.module('projects').factory('ProjectFactory', ['$resource',
  function($resource) {
    var curProject = {};
    var projectId = '';
    var setProjIdFunc = function(pId) {
      projectId = pId;
    };
    var getProjIdFunc = function() {
      return projectId;
    };
    var setCurProjectFunc = function(proj) {
      curProject = proj;
    };
    var getCurProjectFunc = function() {
      return curProject;
    };
    return {
      setProjId: setProjIdFunc,
      getProjId: getProjIdFunc,
      setCurProject: setCurProjectFunc,
      getCurProject: getCurProjectFunc,
      project: $resource('api/projects/:projId', {
        projId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      })
    };
  }
]);

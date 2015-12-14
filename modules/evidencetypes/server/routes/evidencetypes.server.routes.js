'use strict';

/**
 * Module dependencies.
 */
var evidencetypesPolicy = require('../policies/evidencetypes.server.policy'),
  evidencetypes = require('../controllers/evidencetypes.server.controller');

module.exports = function(app) {
  // Evidencetypes collection routes
  app.route('/api/evidencetypes').all(evidencetypesPolicy.isAllowed)
    .get(evidencetypes.list)
    .post(evidencetypes.create);

  // Single evidencetype routes
  app.route('/api/evidencetypes/:evidencetypeId').all(evidencetypesPolicy.isAllowed)
    .get(evidencetypes.read)
    .put(evidencetypes.update)
    .delete(evidencetypes.delete);

  // Evidencetypes collection routes
  app.get('/api/evidencetypes/project/:projectId', function(req, res, next) {
    evidencetypes.evidencetypesByProjectID(req, res, next, req.params.projectId);
  });

  // Finish by binding the evidencetype middleware
  app.param('evidencetypeId', evidencetypes.evidencetypeByID);
  //app.param('projectId', evidencetypes.evidencetypesByProjectID);
};

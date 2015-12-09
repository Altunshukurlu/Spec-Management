'use strict';

/**
 * Module dependencies.
 */
var evidencesPolicy = require('../policies/evidences.server.policy'),
  evidences = require('../controllers/evidences.server.controller');

module.exports = function(app) {
  // Evidences collection routes
  app.route('/api/evidences').all(evidencesPolicy.isAllowed)
    .get(evidences.list)
    .post(evidences.create);

  // Single evidence routes
  app.route('/api/evidences/:evidenceId').all(evidencesPolicy.isAllowed)
    .get(evidences.read)
    .put(evidences.update)
    .delete(evidences.delete);

  app.get('/api/evidences/project/:projectId', function(req, res, next) {
    evidences.evidencesByProjectID(req, res, next, req.params.projectId);
  });
  // Finish by binding the evidence middleware
  app.param('evidenceId', evidences.evidenceByID);
  //app.param('projectId', evidences.evidenceByProjectID);
};

'use strict';

/**
 * Module dependencies.
 */
var evidencesPolicy = require('../policies/evidences.server.policy'),
  evidences = require('../controllers/evidences.server.controller');

module.exports = function(app) {
  app.get('/api/evidences/project/:projectId', function(req, res, next) {
    console.log('Chong Tang: in evidence/project API. projectId = ' + req
      .params.projectId);
    evidences.evidenceByProjectID(req, res, next, req.params.projectId);
  });

  // Evidences collection routes
  app.route('/api/evidences').all(evidencesPolicy.isAllowed)
    .get(evidences.list)
    .post(evidences.create);

  // Single evidence routes
  app.route('/api/evidences/:evidenceId').all(evidencesPolicy.isAllowed)
    .get(evidences.read)
    .put(evidences.update)
    .delete(evidences.delete);

  // Finish by binding the evidence middleware
  app.param('evidenceId', evidences.evidenceByID);
  //app.param('projectId', evidences.evidenceByProjectID);
};

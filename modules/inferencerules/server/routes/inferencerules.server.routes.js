'use strict';

/**
 * Module dependencies.
 */
var inferencerulesPolicy = require('../policies/inferencerules.server.policy'),
  inferencerules = require('../controllers/inferencerules.server.controller');

module.exports = function(app) {
  // Inferencerules collection routes
  app.route('/api/inferencerules').all(inferencerulesPolicy.isAllowed)
    .get(inferencerules.list)
    .post(inferencerules.create);

  // Single inferencerule routes
  app.route('/api/inferencerules/:inferenceruleId').all(inferencerulesPolicy.isAllowed)
    .get(inferencerules.read)
    .put(inferencerules.update)
    .delete(inferencerules.delete);

  // Inferencerules collection routes
  app.get('/api/inferencerules/project/:projectId', function(req, res, next) {
    inferencerules.inferencerulesByProjectID(req, res, next, req.params.projectId);
  });

  // Finish by binding the inferencerule middleware
  app.param('inferenceruleId', inferencerules.inferenceruleByID);
  //app.param('projectId', inferencerules.inferencerulesByProjectID);
};

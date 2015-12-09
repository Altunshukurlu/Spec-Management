'use strict';

/**
 * Module dependencies.
 */
var judgementsPolicy = require('../policies/judgements.server.policy'),
  judgement = require('../controllers/judgements.server.controller');

module.exports = function(app) {
  // Judgements collection routes
  app.route('/api/judgements').all(judgementsPolicy.isAllowed)
    .get(judgement.list)
    .post(judgement.create);

  // Single judgement routes
  app.route('/api/judgements/:judgementId').all(judgementsPolicy.isAllowed)
    .get(judgement.read)
    .put(judgement.update)
    .delete(judgement.delete);

  app.get('/api/judgements/project/:projectId', function(req, res, next) {
    judgement.judgementsByProjectID(req, res, next, req.params.projectId);
  });

  // Finish by binding the judgement middleware
  app.param('judgementId', judgement.judgementByID);
};

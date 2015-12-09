'use strict';

/**
 * Module dependencies.
 */
var propositionsPolicy = require('../policies/propositions.server.policy'),
  proposition = require('../controllers/propositions.server.controller');

module.exports = function(app) {
  // Propositions collection routes
  app.route('/api/propositions').all(propositionsPolicy.isAllowed)
    .get(proposition.list)
    .post(proposition.create);

  // Single proposition routes
  app.route('/api/propositions/:propositionId').all(propositionsPolicy.isAllowed)
    .get(proposition.read)
    .put(proposition.update)
    .delete(proposition.delete);

  app.get('/api/propositions/project/:projectId',
    function(req, res, next) {
      proposition.propositionsByProjectID(req, res, next, req.params.projectId);
    });

  // Finish by binding the proposition middleware
  app.param('propositionId', proposition.propositionByID);
};

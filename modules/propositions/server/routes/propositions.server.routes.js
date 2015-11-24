'use strict';

/**
 * Module dependencies.
 */
var propositionsPolicy = require('../policies/propositions.server.policy'),
  propositions = require('../controllers/propositions.server.controller');

module.exports = function (app) {
  // Propositions collection routes
  app.route('/api/propositions').all(propositionsPolicy.isAllowed)
    .get(propositions.list)
    .post(propositions.create);

  // Single proposition routes
  app.route('/api/propositions/:propositionId').all(propositionsPolicy.isAllowed)
    .get(propositions.read)
    .put(propositions.update)
    .delete(propositions.delete);

  // Finish by binding the proposition middleware
  app.param('propositionId', propositions.propositionByID);
};

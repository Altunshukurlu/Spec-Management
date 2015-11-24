'use strict';

/**
 * Module dependencies.
 */
var judgementsPolicy = require('../policies/judgements.server.policy'),
  judgements = require('../controllers/judgements.server.controller');

module.exports = function (app) {
  // Judgements collection routes
  app.route('/api/judgements').all(judgementsPolicy.isAllowed)
    .get(judgements.list)
    .post(judgements.create);

  // Single judgement routes
  app.route('/api/judgements/:judgementId').all(judgementsPolicy.isAllowed)
    .get(judgements.read)
    .put(judgements.update)
    .delete(judgements.delete);

  // Finish by binding the judgement middleware
  app.param('judgementId', judgements.judgementByID);
};

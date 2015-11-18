'use strict';

/**
 * Module dependencies.
 */
var articlesPolicy = require('../policies/propositions.server.policy'),
  proposition = require('../controllers/propositions.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/propositions').all(articlesPolicy.isAllowed)
    .get(proposition.list)
    .post(proposition.create);

  // Single article routes
  app.route('/api/propositions/:propId').all(articlesPolicy.isAllowed)
    .get(proposition.read)
    .put(proposition.update)
    .delete(proposition.delete);

  // Finish by binding the article middleware
  app.param('propId', proposition.propByID);
};

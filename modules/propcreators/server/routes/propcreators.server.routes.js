'use strict';

/**
 * Module dependencies.
 */
var propcreatorsPolicy = require('../policies/propcreators.server.policy'),
  propcreator = require('../controllers/propcreators.server.controller');

module.exports = function(app) {
  // creator collection routes
  app.route('/api/propcreators').all(propcreatorsPolicy.isAllowed)
    .get(propcreator.list)
    .post(propcreator.create);

  // Single proposition creator routes
  app.route('/api/propcreators/:propCId').all(propcreatorsPolicy.isAllowed)
    .get(propcreator.read)
    .put(propcreator.update)
    .delete(propcreator.delete);

  app.get('/api/propcreators/project/:projectId', function(req, res, next) {
    propcreator.creatorsByProjectID(req, res, next, req.params.projectId);
  });

  // Finish by binding the proposition creator middleware
  app.param('propCId', propcreator.propCreatorByID);
};

'use strict';

/**
 * Module dependencies.
 */
var argumentsPolicy = require('../policies/arguments.server.policy'),
  argmnts = require('../controllers/arguments.server.controller');

module.exports = function (app) {
  // Arguments collection routes
  app.route('/api/arguments').all(argumentsPolicy.isAllowed)
    .get(argmnts.list)
    .post(argmnts.create);

  // Single argument routes
  app.route('/api/arguments/:argumentId').all(argumentsPolicy.isAllowed)
    .get(argmnts.read)
    .put(argmnts.update)
    .delete(argmnts.delete);

  // Finish by binding the argument middleware
  app.param('argumentId', argmnts.argumentByID);
};

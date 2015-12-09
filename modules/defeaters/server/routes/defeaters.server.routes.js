'use strict';

/**
 * Module dependencies.
 */
var defeatersPolicy = require('../policies/defeaters.server.policy'),
  argmnts = require('../controllers/defeaters.server.controller');

module.exports = function (app) {
  // Defeaters collection routes
  app.route('/api/defeaters').all(defeatersPolicy.isAllowed)
    .get(argmnts.list)
    .post(argmnts.create);

  // Single defeater routes
  app.route('/api/defeaters/:defeaterId').all(defeatersPolicy.isAllowed)
    .get(argmnts.read)
    .put(argmnts.update)
    .delete(argmnts.delete);

  // Finish by binding the defeater middleware
  app.param('defeaterId', argmnts.defeaterByID);
};

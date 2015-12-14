'use strict';

/**
 * Module dependencies.
 */
var thingsPolicy = require('../policies/things.server.policy'),
  things = require('../controllers/things.server.controller');

module.exports = function(app) {
  // Things collection routes
  app.route('/api/things').all(thingsPolicy.isAllowed)
    .get(things.list)
    .post(things.create);

  // Single thing routes
  app.route('/api/things/:thingId').all(thingsPolicy.isAllowed)
    .get(things.read)
    .put(things.update)
    .delete(things.delete);

  // Things collection routes
  app.get('/api/things/project/:projectId', function(req, res, next) {
    things.thingsByProjectID(req, res, next, req.params.projectId);
  });

  // Finish by binding the thing middleware
  app.param('thingId', things.thingByID);
  //app.param('projectId', things.thingsByProjectID);
};

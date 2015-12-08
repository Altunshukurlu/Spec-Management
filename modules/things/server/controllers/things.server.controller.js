'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Thing
 */
exports.create = function(req, res) {
  var thing = new Thing(req.body);
  thing.user = req.user;

  thing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  res.json(req.thing);
};

/**
 * Update a thing
 */
exports.update = function(req, res) {
  var thing = req.thing;

  thing.title = req.body.title;
  thing.content = req.body.content;

  thing.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * Delete a thing
 */
exports.delete = function(req, res) {
  var thing = req.thing;

  thing.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(thing);
    }
  });
};

/**
 * List of Things
 */
exports.list = function(req, res) {
  Thing.find().sort('-created').populate('user', 'displayName').exec(function(
    err, things) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(things);
    }
  });
};

exports.thingsByProjectID = function(req, res, next, projectId) {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).send({
      message: 'projectId is invalid'
    });
  }
  Thing.find()
    .where({
      'project': projectId
    })
    .sort('-created').populate('user', 'displayName').exec(function(err,
      things) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(things);
      }
    });
};

/**
 * Thing middleware
 */
exports.thingByID = function(req, res, next, id) {
  console.log('Chong Tang: in thingByID(). id = ' + id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Thing is invalid'
    });
  }

  Thing.findById(id).populate('user', 'displayName').exec(function(err, thing) {
    if (err) {
      return next(err);
    } else if (!thing) {
      return res.status(404).send({
        message: 'No thing  with that identifier has been found'
      });
    }
    req.thing = thing;
    next();
  });
};

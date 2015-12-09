'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Propcreator = mongoose.model('Propcreator'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a propCreator
 */
exports.create = function(req, res) {
  var propCreator = new Propcreator(req.body);
  propCreator.user = req.user;

  propCreator.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(propCreator);
    }
  });
};

/**
 * Show the current propCreator
 */
exports.read = function(req, res) {
  res.json(req.propCreator);
};

/**
 * Update a propCreator
 */
exports.update = function(req, res) {
  var propCreator = req.propCreator;

  propCreator.title = req.body.title;

  propCreator.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(propCreator);
    }
  });
};

/**
 * Delete an propCreator
 */
exports.delete = function(req, res) {
  var propCreator = req.propCreator;

  propCreator.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(propCreator);
    }
  });
};

/**
 * List of propCreators
 */
exports.list = function(req, res) {
  Propcreator.find().sort('-created').populate('user', 'displayName').exec(
    function(err, propCreators) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(propCreators);
      }
    });
};

exports.creatorsByProjectID = function(req, res, next, projectId) {
  Propcreator.find()
    .where({
      'project': projectId
    })
    .sort('-created').populate('user', 'displayName').exec(function(err,
      propCreators) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(propCreators);
      }
    });
};

/**
 * Propcreator middleware
 */
exports.propCreatorByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Creator is invalid'
    });
  }

  Propcreator.findById(id).populate('user', 'displayName').exec(function(err,
    propCreator) {
    if (err) {
      return next(err);
    } else if (!propCreator) {
      return res.status(404).send({
        message: 'No propcreator with that identifier has been found'
      });
    }
    req.propCreator = propCreator;
    next();
  });
};

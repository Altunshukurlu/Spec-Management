'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Inferencerule = mongoose.model('Inferencerule'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Inferencerule
 */
exports.create = function(req, res) {
  var inferencerule = new Inferencerule(req.body);
  inferencerule.user = req.user;

  inferencerule.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inferencerule);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  res.json(req.inferencerule);
};

/**
 * Update a inferencerule
 */
exports.update = function(req, res) {
  var inferencerule = req.inferencerule;

  inferencerule.title = req.body.title;
  inferencerule.content = req.body.content;

  inferencerule.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inferencerule);
    }
  });
};

/**
 * Delete a inferencerule
 */
exports.delete = function(req, res) {
  var inferencerule = req.inferencerule;

  inferencerule.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inferencerule);
    }
  });
};

/**
 * List of Inferencerules
 */
exports.list = function(req, res) {
  Inferencerule.find().sort('-created').populate('user', 'displayName').exec(function(
    err, inferencerules) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inferencerules);
    }
  });
};

exports.inferencerulesByProjectID = function(req, res, next, projectId) {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).send({
      message: 'projectId is invalid'
    });
  }

  Inferencerule.find()
    .where({
      'project': projectId
    })
    .sort('-created').populate('user', 'displayName').exec(function(err,
      inferencerules) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(inferencerules);
      }
    });
};

/**
 * Inferencerule middleware
 */
exports.inferenceruleByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Inferencerule is invalid'
    });
  }

  Inferencerule.findById(id).populate('user', 'displayName').exec(function(err, inferencerule) {
    if (err) {
      return next(err);
    } else if (!inferencerule) {
      return res.status(404).send({
        message: 'No inferencerule  with that identifier has been found'
      });
    }
    req.inferencerule = inferencerule;
    next();
  });
};

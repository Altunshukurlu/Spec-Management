'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Evidencetype = mongoose.model('Evidencetype'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Evidencetype
 */
exports.create = function(req, res) {
  var evidencetype = new Evidencetype(req.body);
  evidencetype.user = req.user;

  evidencetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidencetype);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
  res.json(req.evidencetype);
};

/**
 * Update a evidencetype
 */
exports.update = function(req, res) {
  var evidencetype = req.evidencetype;

  evidencetype.title = req.body.title;
  evidencetype.content = req.body.content;

  evidencetype.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidencetype);
    }
  });
};

/**
 * Delete a evidencetype
 */
exports.delete = function(req, res) {
  var evidencetype = req.evidencetype;

  evidencetype.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidencetype);
    }
  });
};

/**
 * List of Evidencetypes
 */
exports.list = function(req, res) {
  Evidencetype.find().sort('-created').populate('user', 'displayName').exec(function(
    err, evidencetypes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidencetypes);
    }
  });
};

exports.evidencetypesByProjectID = function(req, res, next, projectId) {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).send({
      message: 'projectId is invalid'
    });
  }

  Evidencetype.find()
    .where({
      'project': projectId
    })
    .sort('-created').populate('user', 'displayName').exec(function(err,
      evidencetypes) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(evidencetypes);
      }
    });
};

/**
 * Evidencetype middleware
 */
exports.evidencetypeByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Evidencetype is invalid'
    });
  }

  Evidencetype.findById(id).populate('user', 'displayName').exec(function(err, evidencetype) {
    if (err) {
      return next(err);
    } else if (!evidencetype) {
      return res.status(404).send({
        message: 'No evidencetype  with that identifier has been found'
      });
    }
    req.evidencetype = evidencetype;
    next();
  });
};

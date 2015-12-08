'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Evidence = mongoose.model('Evidence'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a evidence
 */
exports.create = function(req, res) {
  var evidence = new Evidence(req.body);
  //console.log(evidence);
  evidence.user = req.user;

  evidence.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidence);
    }
  });
};

/**
 * Show the current evidence
 */
exports.read = function(req, res) {
  res.json(req.evidence);
};

/**
 * Update a evidence
 */
exports.update = function(req, res) {
  var evidence = req.evidence;

  evidence.title = req.body.title;
  evidence.content = req.body.content;

  evidence.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidence);
    }
  });
};

/**
 * Delete an evidence
 */
exports.delete = function(req, res) {
  var evidence = req.evidence;

  evidence.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evidence);
    }
  });
};

/**
 * List of Evidences
 */
exports.list = function(req, res) {
  console.log('Chong Tang: In evidence list function');
  Evidence.find().sort('-created').populate('user', 'displayName').exec(
    function(err, evidences) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(evidences);
      }
    });
};

exports.evidenceByProjectID = function(req, res, next, projectId) {
  console.log('Chong Tang: In evidenceByProjectID function, projectId = ' +
    projectId);
  Evidence.find()
    .where({
      'project': projectId
    })
    .sort('-created').populate('user', 'displayName').exec(
      function(err, evidences) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          //console.log(evidences);
          res.json(evidences);
        }
      });
};

/**
 * Evidence middleware
 */
exports.evidenceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Evidence is invalid'
    });
  }

  Evidence.findById(id).populate('user', 'displayName').exec(function(err,
    evidence) {
    if (err) {
      return next(err);
    } else if (!evidence) {
      return res.status(404).send({
        message: 'No evidence with that identifier has been found'
      });
    }
    req.evidence = evidence;
    next();
  });
};

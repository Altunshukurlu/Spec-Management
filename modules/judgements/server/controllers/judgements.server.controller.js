
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Judgement = mongoose.model('Judgements'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Judgement
 */
exports.create = function (req, res) {
  var judgement = new Judgement(req.body);
  judgement.user = req.user;

  judgement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(judgement);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.judgement);
};

/**
 * Update a judgement
 */
exports.update = function (req, res) {
  var judgement = req.judgement;

  judgement.title = req.body.title;
  judgement.content = req.body.content;

  judgement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(judgement);
    }
  });
};

/**
 * Delete a judgement
 */
exports.delete = function (req, res) {
  var judgement = req.judgement;

  judgement.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(judgement);
    }
  });
};

/**
 * List of Judgements
 */
exports.list = function (req, res) {
  Judgement.find().sort('-created').populate('user', 'displayName').exec(function (err, judgements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(judgements);
    }
  });
};


/**
 * Judgement middleware
 */
exports.judgementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Judgement is invalid'
    });
  }

  Judgement.findById(id).populate('user', 'displayName').exec(function (err, judgement) {
    if (err) {
      return next(err);
    } else if (!judgement) {
      return res.status(404).send({
        message: 'No judgement  with that identifier has been found'
      });
    }
    req.judgement = judgement;
    next();
  });
};


'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Argument = mongoose.model('Argument'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Argument
 */
exports.create = function (req, res) {
  var argument = new Argument(req.body);
  argument.user = req.user;

  argument.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(argument);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.argument);
};

/**
 * Update a argument
 */
exports.update = function (req, res) {
  var argument = req.argument;

  argument.title = req.body.title;
  argument.content = req.body.content;

  argument.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(argument);
    }
  });
};

/**
 * Delete a argument
 */
exports.delete = function (req, res) {
  var argument = req.argument;

  argument.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(argument);
    }
  });
};

/**
 * List of Arguments
 */
exports.list = function (req, res) {
  Argument.find().sort('-created').populate('user', 'displayName').exec(function (err, argmnts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(argmnts);
    }
  });
};


/**
 * Argument middleware
 */
exports.argumentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Argument is invalid'
    });
  }

  Argument.findById(id).populate('user', 'displayName').exec(function (err, argument) {
    if (err) {
      return next(err);
    } else if (!argument) {
      return res.status(404).send({
        message: 'No argument  with that identifier has been found'
      });
    }
    req.argument = argument;
    next();
  });
};

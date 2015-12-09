
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Defeater = mongoose.model('Defeater'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Defeater
 */
exports.create = function (req, res) {
  var defeater = new Defeater(req.body);
  defeater.user = req.user;

  defeater.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(defeater);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.defeater);
};

/**
 * Update a defeater
 */
exports.update = function (req, res) {
  var defeater = req.defeater;

  defeater.title = req.body.title;
  defeater.content = req.body.content;

  defeater.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(defeater);
    }
  });
};

/**
 * Delete a defeater
 */
exports.delete = function (req, res) {
  var defeater = req.defeater;

  defeater.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(defeater);
    }
  });
};

/**
 * List of Defeaters
 */
exports.list = function (req, res) {
  Defeater.find().sort('-created').populate('user', 'displayName').exec(function (err, defeaters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(defeaters);
    }
  });
};


/**
 * Defeater middleware
 */
exports.defeaterByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Defeater is invalid'
    });
  }

  Defeater.findById(id).populate('user', 'displayName').exec(function (err, defeater) {
    if (err) {
      return next(err);
    } else if (!defeater) {
      return res.status(404).send({
        message: 'No defeater  with that identifier has been found'
      });
    }
    req.defeater = defeater;
    next();
  });
};

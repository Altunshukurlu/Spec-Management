
'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Proposition = mongoose.model('Propositions'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Proposition
 */
exports.create = function (req, res) {
  var proposition = new Proposition(req.body);
  proposition.user = req.user;

  proposition.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(proposition);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  console.log('read==============================================');
  res.json(req.proposition);
};

/**
 * Update a proposition
 */
exports.update = function (req, res) {
  var proposition = req.proposition;

  proposition.title = req.body.title;
  proposition.thing = req.body.selectedThing;
 // proposition.thing = req.
  proposition.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(proposition);
    }
  });
};

/**
 * Delete a Proposition
 */
exports.delete = function (req, res) {
  var proposition = req.proposition;
  proposition.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(proposition);
    }
  });
};

/**
 * List of Propositions
 */
exports.list = function (req, res) {
  Proposition.find().sort('-created').populate('user', 'displayName').exec(function (err, proposition) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(proposition);
    }
  });
};


/**
 * Proposition middleware
 */
exports.propositionByID = function (req, res, next, id) {
  console.log('PropositionByID====================================================');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Proposition is invalid'
    });
  }

  Proposition.findById(id).populate('user', 'displayName').exec(function (err, proposition) {
    if (err) {
      return next(err);
    } else if (!proposition) {
      return res.status(404).send({
        message: 'No proposition  with that identifier has been found'
      });
    }
    req.proposition = proposition;
    next();
  });
};


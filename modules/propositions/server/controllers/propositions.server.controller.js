'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Proposition = mongoose.model('Proposition'),
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Proposition
 */
exports.create = function(req, res) {
  var proposition = new Proposition(req.body);
  proposition.user = req.user;

  proposition.save(function(err) {
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
exports.read = function(req, res) {
  res.json(req.proposition);
};

/**
 * Update a proposition
 */
exports.update = function(req, res) {
  var proposition = req.proposition;
  proposition.title = req.body.title;
  proposition.thing = req.body.thing;
  proposition.firstProposition = req.body.firstProposition;
  proposition.secondProposition = req.body.secondProposition;
  proposition.evidences = req.body.evidences;
  proposition.judgements = req.body.judgements;
  // proposition.thing = req.
  proposition.save(function(err) {
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
exports.delete = function(req, res) {
  var proposition = req.proposition;
  proposition.remove(function(err) {
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
exports.list = function(req, res) {
  Proposition.find().sort('-created')
    .populate('user', 'displayName')
    .populate('thing', 'title')
    .populate('propcreator', 'title')
    .populate('evidences', 'title')
    .populate('judgements', 'title')
    .populate('firstProposition', 'title')
    .populate('secondProposition', 'title')
    .exec(function(err, proposition) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(proposition);
      }
    });
};

exports.propositionsByProjectID = function(req, res, next, projectId) {
  Proposition.find()
    .where({
      project: projectId
    })
    .sort('-created')
    .populate('user', 'displayName')
    .populate('thing', 'title')
    .populate('propcreator', 'title')
    .populate('evidences', 'title')
    .populate('judgements', 'title')
    .populate('firstProposition', 'title')
    .populate('secondProposition', 'title')
    .exec(function(err, proposition) {
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
exports.propositionByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Proposition is invalid'
    });
  }

  Proposition.findById(id)
    .populate('user', 'displayName')
    .populate('thing', 'title')
    .populate('propcreator', 'title')
    .populate('evidences', 'title')
    .populate('judgements', 'title')
    .populate('firstProposition', 'title')
    .populate('secondProposition', 'title')
    .exec(function(err, proposition) {
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

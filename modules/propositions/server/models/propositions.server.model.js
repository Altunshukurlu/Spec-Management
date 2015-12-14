'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Proposition Schema
 */
var PropositionSchema = new Schema({
  project: {
    type: Schema.ObjectId,
    ref: 'Project'
  },
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  thing: {
    type: Schema.ObjectId,
    ref: 'Thing'
  },
  propcreator: {
    type: Schema.ObjectId,
    ref: 'Propcreator'
  },
  evidences: {
    type: Schema.ObjectId,
    ref: 'Evidence'
  },
  judgements: {
    type: Schema.ObjectId,
    ref: 'Judgements'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  firstProposition: {
    type: Schema.ObjectId,
    ref: 'Proposition'
  },
  secondProposition: {
    type: Schema.ObjectId,
    ref: 'Proposition'
  },
  type: {
    type: String,
    default: 'Basic',
    required: 'Type cannot be blank'
  }
});

mongoose.model('Proposition', PropositionSchema);

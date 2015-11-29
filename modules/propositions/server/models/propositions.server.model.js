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
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Proposition', PropositionSchema);

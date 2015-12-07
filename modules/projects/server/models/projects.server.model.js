'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
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
  notes: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  things: [Schema.ObjectId],
  propositions: [Schema.ObjectId],
  evidences: [Schema.ObjectId],
  judgements: [Schema.ObjectId],
  propocreators: [Schema.ObjectId]
});

mongoose.model('Projects', ProjectSchema);

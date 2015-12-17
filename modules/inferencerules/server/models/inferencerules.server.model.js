'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Inferencerule Schema
 */
var InferenceruleSchema = new Schema({
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
  premise: {
    type: String,
    default: '',
    trim: true,
    required: 'Premise cannot be blank'
  },
  conclusion: {
    type: String,
    default: '',
    trim: true,
    required: 'Conclusion cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Inferencerule', InferenceruleSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Evidence Schema
 */
var EvidenceSchema = new Schema({
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
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  etype: {
    type: Schema.ObjectId,
    ref: 'Evidencetype'
  }
});

mongoose.model('Evidence', EvidenceSchema);

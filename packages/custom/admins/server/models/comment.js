'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Category Schema
 */

var commentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    post_id: {
        type: Schema.ObjectId,
        ref: 'Post',
        default: null
    },
    user_id: {
      type: Schema.ObjectId,
      ref: 'User'
    }
});

mongoose.model('Comment', commentSchema);

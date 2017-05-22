'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    Category = mongoose.model('Category'),
    Post = mongoose.model('Post'),
    _ = require('lodash');
exports.getAllpost = function(req, res){
  Post.find(function(err, data){
    if (err) {
      res.json(err);
    }else {
      res.json(data);
    }
  })
}

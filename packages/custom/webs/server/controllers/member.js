'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

exports.getAllPost = function(req, res, next){
  Post.find({user_id: req.params.id}, function(err, data){
      if(err){
          return res.send(500);
      }
      res.json(data);
  })
}

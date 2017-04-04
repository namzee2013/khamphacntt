'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment'),
    User = mongoose.model('User'),
    _ = require('lodash');

exports.findCommetnByPost = function(req, res, next){
  Comment.find({post_id: req.params.post_id}, function(err, data){
      if(err){
          return res.json(err);
      }else{
        res.json(data);
      }

  })
}
exports.create = function(req, res, next){
  var comment = new Comment(req.body);

  comment.save(function(err, newComment){
      if(err){
          return res.json(err);
      }else{
        res.json(newComment);
      }

  })
}
exports.getUserById = function(req, res, next){
  User.find({_id: req.params.id}, function(err, data){
      if(err){
          return res.json(err);
      }else{
        res.json(data);
      }

  })
}

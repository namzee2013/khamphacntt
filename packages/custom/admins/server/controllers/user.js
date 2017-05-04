'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    User = mongoose.model('User'),
    _ = require('lodash');

exports.findAll = function(req, res){
  User.find(function(err, data){
    if (err) {
      res.json(err)
    }
    res.json(data)
  });
}

exports.findOne = function(req, res){
  User.findOne({_id: req.params.id}, function(err, data){
    if (err) {
      res.json(err)
    }
    res.json(data)
  })

}

exports.update = function(req, res){

  var query = {_id: req.params.id};
  var user = req.body;

  User.findOneAndUpdate(query, user, function(err) {
      if (err) {
          return res.json(err)
      } else {
          res.json(user);
      }
  });

}

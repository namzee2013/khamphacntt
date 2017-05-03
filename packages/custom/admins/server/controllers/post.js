'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    slug = require('slug'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

exports.findAll = function(req, res){
    Post.find(function(err, posts){
        if(err){
            return res.send(err);
        }
        res.json(posts);
    })
}
exports.create = function(req, res){

    var post = new Post(req.body);

    post.save(function(err, newPost){
        if(err){
            return res.send(400);
        }
        res.json(newPost);
    })
}
exports.edit = function(req, res){
    Post.findOne({_id: req.params.id}, function(err, data){
        if(err){
            return res.json(err);
        }
        res.json(data);
    })
}
exports.update = function(req, res){
    var query = {_id: req.params.id};
    var post = req.post;

    post = _.extend(post , req.body);

    post.slug = slug(post.title)

    Post.findOneAndUpdate(query, post, function(err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(post);
        }
    });
}
exports.delete = function(req, res){
    Post.remove({_id: req.params.id}, function(err, deleted){
        if(err) res.send(err)
        res.json(deleted);
    });
}

exports.getPostByCategory = function(req, res){
    Post.find({category_id: req.params.category_id}, function(err, data){
        if(err) res.json(err)
        res.json(data);
    })
}

exports.getPostBySeries = function(req, res){
    Post.find({news_series_id: req.params.news_series_id}, function(err, data){
        if(err) res.json(err);
        res.json(data);
    })
}

exports.getPostTop10 = function(req, res, next){
  var query = [
    {$limit: 10},
    {$sort: {view_count: -1}},
    {$match: { status: "show" }}
  ];
  Post.aggregate(query, function(err, data){
    if (err) {
      res.json(err);
    }else {
      res.json(data);
    }
  })
}

exports.getPostBySlug = function(req, res, next){
    Post.findOne({slug: req.params.slug}, function(err, data){
        if(err) res.json(err)
        res.json(data);
    })
}

exports.pushViewCount = function(req, res, next){

  Post.findOne({_id: req.params.id}, function(err, data){
    var post = data;
    post.view_count = post.view_count + 1;
    var query = {_id: post._id};
    Post.findOneAndUpdate(query, post, function(err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(post);
        }
    });
  });
}
exports.findTop10PostBySeries = function(req, res, next){
  var news_series_id = req.params.news_series_id;
  Post.find({news_series_id: news_series_id, status: 'show'}, function(err, data){
    if (err) {
      res.json(err);
    }else {
      data.sort(function(a,b){return a['view_count'] - b['view_count']});
      data.reverse();
      res.json(data.slice(0,10));
    }
  })
}
exports.findHide = function(req, res, next){
  Post.find({status: 'hide'}, function(err, data){
      if(err){
          return res.json(err);
      }
      res.json(data);
  })
}

exports.published = function(req, res, next){
  Post.findOne({_id: req.params.id}, function(err, data){
    var post = data;
    post.status = 'show';
    var query = {_id: post._id};
    Post.findOneAndUpdate(query, post, function(err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(post);
        }
    });
  });
}

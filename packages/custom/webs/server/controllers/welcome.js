'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

exports.getPostByCategory = function(req, res, next){
  var page = parseInt(req.query.pageca);
  var limit = parseInt(req.query.limitca);
  var category_id = req.query.textca;

  Post.paginate({
    category_id: category_id,
    published: 'Yes',
    status: 'show'
  }, {
    select: {
      title: 1,
      description: 1,
      image: 1,
      author: 1,
      view_count: 1,
      created_at: 1,
      news_series_id: 1,
      series: 1,
      slug: 1,
      image: 1,
      _id: 0
    },
    page: page,
    limit: limit
  }, function (err, post, pageCount, itemCount) {
    if (err) return next(err);
    pageCount = pageCount || 1;
    res.json({
      data: post.docs,
      limit: post.limit,
      page: post.page,
      pages: post.pages,
      total: post.total
    });
  });
}

exports.getPostBySeries = function(req, res, next){
  var page = parseInt(req.query.pagese);
  var limit = parseInt(req.query.limitse);
  var news_series_id = req.query.textse;
  Post.paginate({
    news_series_id: news_series_id,
    published: 'Yes',
    status: 'show'
  }, {
    select: {
      title: 1,
      description: 1,
      image: 1,
      author: 1,
      view_count: 1,
      created_at: 1,
      news_series_id: 1,
      series: 1,
      slug: 1,
      image: 1,
      _id: 0
    },
    page: page,
    limit: limit
  }, function (err, post, pageCount, itemCount) {
    if (err) return next(err);
    pageCount = pageCount || 1;
    res.json({
      data: post.docs,
      limit: post.limit,
      page: post.page,
      pages: post.pages,
      total: post.total
    });
  });
}

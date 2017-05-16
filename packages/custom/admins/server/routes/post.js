(function() {
    'use strict';

    var post = require('../controllers/post');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Posts ,app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var requiresManagement = circles.controller.hasCircle('management');

        app.get('/api/post', requiresLogin, post.findAll);

        app.post('/api/post', requiresLogin, post.create);

        app.get('/api/post/:id', post.edit);

        app.put('/api/post/:id', requiresLogin, post.update);

        app.delete('/api/post/:id', requiresLogin, post.delete);

        app.get('/api/post/category/:category_id', post.getPostByCategory);

        app.get('/api/post/series/:news_series_id', post.getPostBySeries);

        app.get('/api/post/top-10/orderby', post.getPostTop10);

        app.get('/api/post/top-10/series/:news_series_id', post.findTop10PostBySeries);

        app.get('/api/post/slug/:slug', post.getPostBySlug);

        app.get('/api/post/view-count/:id', post.pushViewCount);

        app.get('/api/post/status/hide', post.findHide);

        app.get('/api/post/get-post-by-category/hide/:cateID', post.getPostByCategoryHide)

        app.get('/api/post/status/hide/published/:id',requiresManagement, post.published);
    };
})();

(function() {
    'use strict';

    var post = require('../controllers/post');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Posts ,app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/post', requiresAdmin, post.findAll);

        app.post('/api/post', requiresAdmin, post.create);

        app.get('/api/post/:id', post.edit);

        app.put('/api/post/:id', requiresAdmin, post.update);

        app.delete('/api/post/:id', requiresAdmin, post.delete);

        app.get('/api/post/category/:category_id', post.getPostByCategory);

        app.get('/api/post/series/:news_series_id', post.getPostBySeries);

        app.get('/api/post/slug/:slug', post.getPostBySlug);

        app.get('/api/post/view-count/:id', post.pushViewCount);
    };
})();

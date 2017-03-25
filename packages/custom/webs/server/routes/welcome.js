(function() {
    'use strict';

    var welcome = require('../controllers/welcome');
    var paginate = require('express-paginate');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Welcome ,app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.use(paginate.middleware(10, 50));
        app.get('/api/post-category-paginate', welcome.getPostByCategory);
        app.get('/api/post-series-paginate', welcome.getPostBySeries);
    };
})();

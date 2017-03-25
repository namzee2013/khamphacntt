(function() {
    'use strict';

    var search = require('../controllers/search');
    var paginate = require('express-paginate');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Search ,app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.use(paginate.middleware(10, 50));
        app.get('/api/search', search.search);
    };
})();

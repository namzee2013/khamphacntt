(function() {
    'use strict';

    var test = require('../controllers/test');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Category, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        app.get("/api/test/post",test.getAllpost);
    };
})();

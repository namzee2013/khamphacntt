(function() {
    'use strict';

    var user = require('../controllers/user');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(User, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/user', user.findAll);

        app.get('/api/user/find/:id', user.findOne);
        app.put('/api/user/update/:id', user.update);
    };
})();

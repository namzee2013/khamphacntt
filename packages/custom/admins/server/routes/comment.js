(function() {
    'use strict';

    var comment = require('../controllers/comment');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Comment, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/comment-post/:post_id', comment.findCommetnByPost);
        app.post('/api/comment', comment.create);
        app.get('/api/user/:id', comment.getUserById);

    };
})();

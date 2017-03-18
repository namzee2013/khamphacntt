(function() {
    'use strict';

    var series = require('../controllers/series');
    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Series, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/series', requiresAdmin, series.findAll);

        app.post('/api/series', requiresAdmin, series.create);

        app.get('/api/series/:id', series.edit);

        app.put('/api/series/:id', requiresAdmin, series.update);
        
        app.delete('/api/series/:id', requiresAdmin, series.delete);

        app.get('/api/series/slug/:slug', series.getSeriesBySlug);

        app.get('/api/series/all/web', series.getAllSeries);

    };
})();

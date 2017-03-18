(function() {
    'use strict';

    function Series($stateProvider) {
        $stateProvider.state('series', {
            url: '/admin/series',
            templateUrl: 'admins/views/series/index.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('series create', {
            url: '/admin/series/create',
            templateUrl: 'admins/views/series/create.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('series update', {
            url: '/admin/series/update/:id',
            templateUrl: 'admins/views/series/update.html',
            requiredCircles: {
                circles: ['admin']
            }
        })
        ;
    }

    angular
        .module('mean.admins')
        .config(Series);

    Series.$inject = ['$stateProvider'];

})();

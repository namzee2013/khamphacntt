(function() {
    'use strict';

    function News($stateProvider) {
        $stateProvider.state('post', {
            url: '/admin/post',
            templateUrl: 'admins/views/post/index.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('post create', {
            url: '/admin/post/create',
            templateUrl: 'admins/views/post/create.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('post update', {
            url: '/admin/post/update/:id',
            templateUrl: 'admins/views/post/update.html',
            requiredCircles: {
                circles: ['admin']
            }
        })
        ;
    }

    angular
        .module('mean.admins')
        .config(News);

    News.$inject = ['$stateProvider'];

})();

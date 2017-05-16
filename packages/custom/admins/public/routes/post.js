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
        }).state('post publish', {
          url: '/admin/post/publish',
          templateUrl: 'admins/views/post/publish.html',
          requiredCircles: {
            circles: ['management']
          }
        }).state('post publish review',{
          url: '/admin/post/:id/review',
          templateUrl: 'admins/views/post/review.html',
          requiredCircles: {
            circles: ['management']
          }
        })
        ;
    }

    angular
        .module('mean.admins')
        .config(News);

    News.$inject = ['$stateProvider'];

})();

(function() {
    'use strict';

    function Category($stateProvider) {
        $stateProvider.state('category', {
            url: '/admin/category',
            templateUrl: 'admins/views/category/index.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('category create', {
            url: '/admin/category/create',
            templateUrl: 'admins/views/category/create.html',
            requiredCircles: {
                circles: ['admin']
            }
        }).state('category update', {
            url: '/admin/category/update/:id',
            templateUrl: 'admins/views/category/update.html',
            requiredCircles: {
                circles: ['admin']
            }
        })
        ;
    }

    angular
        .module('mean.admins')
        .config(Category);

    Category.$inject = ['$stateProvider'];

})();

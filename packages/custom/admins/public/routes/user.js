(function() {
    'use strict';

    function User($stateProvider) {
        $stateProvider.state('access for user index', {
            url: '/admin/access/user',
            templateUrl: 'admins/views/user/index.html'
        }).state('access for user', {
          url: '/admin/access/user/:id',
          templateUrl: 'admins/views/user/access.html'
        })
        ;
    }

    angular
        .module('mean.admins')
        .config(User);

    User.$inject = ['$stateProvider'];

})();

(function() {
    'use strict';

    function Welcome($stateProvider) {
        $stateProvider.state('category post', {
            url: '/category/:slug',
            templateUrl: 'webs/views/category.html',
        })
        ;
    }
    angular
        .module('mean.webs')
        .config(Welcome);

    Welcome.$inject = ['$stateProvider'];

})();

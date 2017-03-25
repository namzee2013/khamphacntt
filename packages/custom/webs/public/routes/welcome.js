(function() {
    'use strict';

    function Welcome($stateProvider) {
        $stateProvider.state('category post', {
            url: '/category/:slug',
            templateUrl: 'webs/views/category.html',
        }).state('series post', {
          url: '/series/:slug',
          templateUrl: 'webs/views/series.html'
        })
        ;
    }
    angular
        .module('mean.webs')
        .config(Welcome);

    Welcome.$inject = ['$stateProvider'];

})();

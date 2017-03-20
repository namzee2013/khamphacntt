(function() {
    'use strict';

    function Article($stateProvider) {
        $stateProvider.state('article', {
            url: '/article/:slug',
            templateUrl: 'webs/views/article.html',
        })
        ;
    }

    angular
        .module('mean.webs')
        .config(Article);

    Article.$inject = ['$stateProvider'];

})();

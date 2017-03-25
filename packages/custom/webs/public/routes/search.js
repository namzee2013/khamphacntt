(function() {
    'use strict';

    function Search($stateProvider) {
        $stateProvider.state('search', {
            url: '/search?:key&:text',
            templateUrl: 'webs/views/search.html',
        })
        ;
    }

    angular
        .module('mean.webs')
        .config(Search);

    Search.$inject = ['$stateProvider'];

})();

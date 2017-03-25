(function() {
    'use strict';

    function Welcome($http, $q) {
        return {
            getCategoryBySlug: function(slug){
                var deferred = $q.defer();
                $http({
                  method: 'GET',
                  url: '/api/category/slug/' + slug
                }).then(function successCallback(response) {
                  deferred.resolve(response);
                }, function errorCallback(response) {
                  deferred.reject(response);
                });
                return deferred.promise;
            },
            getPostByCategory: function(category_id, page, limit){
                var deferred = $q.defer();
                $http({
                  method: 'GET',
                  url: '/api/post-category-paginate?textp=' + category_id + '&pagep=' + (page ? page : '1') + '&limitp=' + (limit ? limit : '5')
                }).then(function successCallback(response) {
                  deferred.resolve(response);
                }, function errorCallback(response) {
                  deferred.reject(response);
                });
                return deferred.promise;
            },

        };
    }
    angular
        .module('mean.webs')
        .factory('Welcome', Welcome);

    Welcome.$inject = ['$http', '$q'];

})();

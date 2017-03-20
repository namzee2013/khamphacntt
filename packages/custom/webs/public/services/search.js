(function() {
    'use strict';

    function Search($http, $q) {
        return {
            searchByKey: function(key, value, page, limit){
                var deferred = $q.defer();
                $http({
                  method: 'GET',
                  url: '/api/search?key=' + key + '&text=' + value + '&page=' + (page ? page : '1') + '&limit=' + (limit ? limit : '10')
                }).then(function successCallback(response) {
                  deferred.resolve(response);
                }, function errorCallback(response) {
                  deferred.reject(response);
                });
                return deferred.promise;
            }
        };
    }
    angular
        .module('mean.webs')
        .factory('Search', Search);

    Search.$inject = ['$http', '$q'];

})();

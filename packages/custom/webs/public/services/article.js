(function() {
    'use strict';

    function Article($http, $q) {
        return {
            getArticle: function(slug){
                var deferred = $q.defer();
                $http({
                  method: 'GET',
                  url: '/api/post/slug/' + slug
                }).then(function successCallback(response) {
                  deferred.resolve(response);
                }, function errorCallback(response) {
                  deferred.reject(response);
                });
                return deferred.promise;
            },
            pushViewCount: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/post/view-count/' + id
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            top10ViewPostBySeries: function(news_series_id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/post/top-10/series/' + news_series_id
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
        .factory('Article', Article);

    Article.$inject = ['$http', '$q'];

})();

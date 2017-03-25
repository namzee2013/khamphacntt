(function() {
    'use strict';

    function Nav($http, $q) {
        return {
            getParentCategory: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/parent'
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            getCategoryByParent: function(parent_id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/category/parent/' + parent_id
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            getCategoryNotNull: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/parent/notnull'
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            getAllSeries: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/series'
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
        .factory('Nav', Nav);

    Nav.$inject = ['$http', '$q'];

})();

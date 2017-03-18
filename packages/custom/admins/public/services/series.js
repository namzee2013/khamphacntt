(function() {
    'use strict';

    function Series($http, $q) {
        return {
            name: 'series',
            index: function(){
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
            },
            create: function(data){
              var deferred = $q.defer();
              $http({
                method: 'POST',
                url: '/api/series',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            find: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/series/' + id
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            update: function(id, data){
              var deferred = $q.defer();
              $http({
                method: 'PUT',
                url: '/api/series/' + id,
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            delete: function(id){
              var deferred = $q.defer();
              $http({
                method: 'DELETE',
                url: '/api/series/' + id,
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
        .module('mean.admins')
        .factory('Series', Series);

    Series.$inject = ['$http', '$q'];

})();

(function() {
    'use strict';

    function Member($http, $q) {
        return {
            name: 'member',
            index: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/member/post/' + id
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
                url: '/api/post',
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
                url: '/api/post/' + id,
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
                url: '/api/post/' + id,
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
                url: '/api/post/' + id,
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
        .factory('Member', Member);

    Member.$inject = ['$http', '$q'];

})();

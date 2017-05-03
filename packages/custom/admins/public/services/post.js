(function() {
    'use strict';

    function Post($http, $q) {
        return {
            name: 'post',
            index: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/post'
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
            findHide: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/post/status/hide',
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
            },
            published: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/post/status/hide/published/' + id,
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
        .factory('Post', Post);

    Post.$inject = ['$http', '$q'];

})();

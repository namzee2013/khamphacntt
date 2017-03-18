(function() {
    'use strict';

    function Category($http, $q) {
        return {
            name: 'category',
            find: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/category/' + id
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
                url: '/api/category/' + id,
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
                url: '/api/category/' + id
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
                url: '/api/category',
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
            index: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/category'
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            getparentNull: function(){
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
            findCate: function(){
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
        };
    }


    angular
        .module('mean.admins')
        .factory('Category', Category);

    Category.$inject = ['$http', '$q'];

})();

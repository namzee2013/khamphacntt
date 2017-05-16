(function() {
    'use strict';

    function User($http, $q) {
        return {
            name: 'user',
            index: function(){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/user'
              }).then(function successCallback(response) {
                deferred.resolve(response);
              }, function errorCallback(response) {
                deferred.reject(response);
              });
              return deferred.promise;
            },
            findOne: function(id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/user/find/' + id
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
                url: '/api/user/update/' + id,
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
            
        };
    }


    angular
        .module('mean.admins')
        .factory('User', User);

    User.$inject = ['$http', '$q'];

})();

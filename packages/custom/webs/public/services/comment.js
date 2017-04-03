(function() {
    'use strict';

    function Comments($http, $q) {
        return {
            postComment: function(data){
              var deferred = $q.defer();
              $http({
                method: 'POST',
                url: '/api/comment',
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
            getCommentByPost: function(post_id){
              var deferred = $q.defer();
              $http({
                method: 'GET',
                url: '/api/comment-post/' + post_id
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
        .factory('Comments', Comments);

    Comments.$inject = ['$http', '$q'];

})();

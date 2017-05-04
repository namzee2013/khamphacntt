(function () {
    'use strict';

    /* jshint -W098 */

    function UserController(User, Category, Series, $scope, Global, $stateParams, $state, $http, $location, $window, $rootScope, MeanUser) {

        $scope.global = Global;
        $scope.package = {
            name: 'user'
        };

        $scope.findAll = function(){
          User.index().then(function(response){
            if (response.status === 200) {
              $scope.users = response.data;
            }
          })
        }

        $scope.access = function(item){
          $state.go('access for user', {id: item._id})
        }

        $scope.findOne = function(){
          Category.findCate().then(function(response){
            if (response.status === 200) {
              $scope.categories = response.data;
            }
          })

          Series.index().then(function(response){
            if (response.status === 200) {
              $scope.series = response.data;
            }
          })
          User.findOne($stateParams.id).then(function(response){
            if (response.status === 200) {
              $scope.user = response.data;
            }
          })
        }

        $scope.update = function(){


          User.update($stateParams.id, $scope.user).then(function(response){
            if (response.status === 200) {
              $state.go('access for user index')
            }
          })
        }

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };

    }
    angular
        .module('mean.admins')
        .controller('UserController', UserController);

    UserController.$inject = ['User', 'Category', 'Series', '$scope', 'Global', '$stateParams', '$state', '$http', '$location', '$window', '$rootScope', 'MeanUser'];

})();

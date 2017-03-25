(function() {
    'use strict';

    /* jshint -W098 */

    function NavController($scope, $rootScope, Global, Nav, $stateParams, $state, $location, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'nav'
        };

        $scope.getAllCate = function(){

          Nav.getCategoryNotNull().then(function(response){
            if(response.status == 200){
              $scope.categories = response.data;
            }
          })
          // Nav.getParentCategory().then(function(response){
          //   var categories = response.data;
          //   angular.forEach(categories, function(value, key){
          //       Nav.getCategoryByParent(value._id).then(function(response){
          //           value.parent.push(response.data);
          //       });
          //   }, this);
          //   $scope.categories = categories;
          //   console.log($scope.categories);
          // });

        }

        $scope.getAllSeries = function(){
          Nav.getAllSeries().then(function(response){
            if (response.status == 200) {
              $scope.series = response.data;
            }
          })
        }
    }

    angular
        .module('mean.webs')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$rootScope', 'Global', 'Nav', '$stateParams', '$state', '$location', '$http'];

})();

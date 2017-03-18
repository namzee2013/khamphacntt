(function () {
    'use strict';

    /* jshint -W098 */

    function SeriesController($scope, $rootScope, Global, Series, Category, $stateParams, $state, $http, $location, $window) {
        $scope.global = Global;
        $scope.package = {
            name: 'series'
        };
        $scope.findAll = function(){
          Series.index().then(function(response){
            if (response.status == 200) {
              $scope.listSeries = response.data;
              $rootScope.$title = 'Danh sách series';
            }
          })
        };
        $scope.gotoSeries = function(){
            $state.go('series create');
            $rootScope.$title = 'Thêm Series';
        }
        $scope.findCate = function(){
          Category.findCate().then(function(response){
            if (response.status == 200) {
              $scope.cates = response.data;
            }
          })
        }
        $scope.create = function(){
          Series.create($scope.series).then(function(response){
            if (response.status == 200) {
              $state.go('series')
            }
          })
        }
        $scope.edit = function(item){
            $state.go('series update', {id: item._id});
        }
        $scope.findOne = function(){
          Series.find($stateParams.id).then(function(response){
            if (response.status == 200) {
              $rootScope.$title = 'Cập nhật series';
              $scope.series = response.data;
            }
          })
        }
        $scope.update = function(){
          Series.update($stateParams.id, $scope.series).then(function(response){
            if (response.status == 200) {
              $state.go('series')
            }
          })
        }
        $scope.delete = function(item){
          if ($window.confirm('Please confirm?')) {
            Series.delete(item._id).then(function(response){
              if (response.status == 200) {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
              }
            })
          }
        }
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };


    }

    angular
        .module('mean.admins')
        .controller('SeriesController', SeriesController);

    SeriesController.$inject = ['$scope', '$rootScope', 'Global', 'Series', 'Category', '$stateParams', '$state', '$http', '$location', '$window'];

})();

(function () {
    'use strict';

    /* jshint -W098 */

    function CategoryController(Category, $scope, $rootScope, Global, $stateParams, $state, $http, $location, $window) {
        $scope.global = Global;
        $scope.package = {
            name: 'category'
        };

        $scope.findAll = function(){
          Category.index().then(function(response){
            if (response.status == 200) {
              $rootScope.$title = 'Danh mục bài viết';
              $scope.categories = response.data;
            }

          })
        };
        $scope.findParent = function(){
            Category.getparentNull().then(function(response){
              $scope.cates = response.data;
            })
        };

        $scope.gotoCreate = function(){
            $state.go('category create');
            $rootScope.$title = 'Thêm danh mục vài viết';
        }
        $scope.create = function(isValid){
            if(isValid){
              Category.create($scope.category).then(function(response){
                if (response.status == 200) {
                  $state.go('category');
                }
              })
            }
        };
        $scope.edit = function(cate){
            $state.go('category update', {id: cate._id});
        }
        $scope.findOne = function(){
          Category.find($stateParams.id).then(function(response){
            if (response.status == 200) {
              $rootScope.$title = 'Cập nhật danh mục bài viết'
              $scope.category = response.data;
            }
          })
        }

        $scope.update = function(isValid){
          if (isValid) {
            Category.update($stateParams.id, $scope.category).then(function(response){
              if (response.status == 200) {
                $state.go('category');
              }
            })
          }
        }

        $scope.delete = function(cate){
            if ($window.confirm('Please confirm?')) {
              Category.delete(cate._id).then(function(response){
                if (response.status == 200) {
                  $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
                }
              });
            }
        }

        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };


    }

    angular
        .module('mean.admins')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['Category', '$scope', '$rootScope', 'Global', '$stateParams', '$state', '$http', '$location', '$window'];

})();

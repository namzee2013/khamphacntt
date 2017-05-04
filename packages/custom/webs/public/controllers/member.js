(function() {
    'use strict';

    /* jshint -W098 */

    function MemberController(Member, Category, Series, Post, $scope, $rootScope, Global, $stateParams, $state, $location, $http, $window, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'memberpost'
        };

        $scope.gotoCreate = function(){
          $state.go('memberpost create');
          $rootScope.$title = 'Thêm bài viết';
        }
        $scope.getAllMyPost = function(){

          Member.index(MeanUser.user._id).then(function(response){
            if (response.status === 200) {
              $scope.posts = response.data;
            }
          });
        }
        $scope.create = function()
        {

          var flag = false;
          angular.forEach(MeanUser.user.categories, function(value, key){
              if (value === $scope.post.category_id) {
                flag = true;
              }
          }, this);
          angular.forEach(MeanUser.user.series, function(value, key){
            if (value === $scope.post.news_series_id) {
              flag = true;
            }
          });
          if (flag) {
            $scope.post.status = 'hide';
            $scope.post.user_id = MeanUser.user._id;
            $scope.post.image = $scope.image;
            $scope.post.images = $scope.images;
            $scope.post.author = MeanUser.user.name;
            Post.create($scope.post).then(function(response){
              if(response.status == 200){
                $state.go('memberpost')
              }
            })
          }else {
            $state.go('memberpost');
          }

        }
        $scope.findSeries = function(){
          Series.index().then(function(response){
            if (response.status == 200) {
              $scope.series = [];
              var series = response.data;
              angular.forEach(MeanUser.user.series, function(valueSeries, keySeries){
                angular.forEach(series, function(value, key){
                  if (valueSeries === value._id) {
                    $scope.series.push(value);
                  }
                }, this);
              }, this);
            }
          })
        }
        $scope.findCategory = function(){
          Category.findCate().then(function(response){
            if (response.status == 200) {
              // $scope.cates = response.data;
              $scope.cates = [];
              var cates = response.data;
              angular.forEach(MeanUser.user.categories, function(valueCategory, keyCategory){
                angular.forEach(cates, function(value, key){
                  if (valueCategory === value._id) {
                    $scope.cates.push(value);
                  }
                }, this);
              }, this);
            }
          })
        }
        $scope.edit = function(post){
          $state.go('memberpost update', {id: post._id});
        }
        $scope.findOne = function(){
          Post.find($stateParams.id).then(function(response){
            if (response.status == 200) {
              $scope.post = response.data;
              $rootScope.$title = 'Cập nhật bài viết';
            }
          })
        }
        $scope.update = function(){
          $scope.post.updated_at = Date.now;
          $scope.post.image = $scope.image;
          for(var i in $scope.images)
              $scope.post.images.push($scope.images[i]);
          Post.update($stateParams.id, $scope.post).then(function(response){
            if (response.status == 200) {
              $state.go('memberpost');
            }
          })
        }
        $scope.delete = function(post){
            if ($window.confirm('Please confirm?')) {
              Post.delete(post._id).then(function(response){
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
    }

    angular
        .module('mean.webs')
        .controller('MemberController', MemberController);

    MemberController.$inject = ['Member', 'Category', 'Series', 'Post', '$scope', '$rootScope', 'Global', '$stateParams', '$state', '$location', '$http', '$window', 'MeanUser'];

})();

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
        }
        $scope.findSeries = function(){
          Series.index().then(function(response){
            if (response.status == 200) {
              $scope.series = response.data;
            }
          })
        }
        $scope.findCategory = function(){
          Category.findCate().then(function(response){
            if (response.status == 200) {
              $scope.cates = response.data;
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

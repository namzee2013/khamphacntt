(function () {
    'use strict';

    /* jshint -W098 */

    function PostController($scope, Global, Post, Category, Series, $stateParams, $state, $http, $location, $window, $rootScope, MeanUser) {

        $scope.global = Global;
        $scope.package = {
            name: 'post'
        };
        $scope.findAll = function(){
          Post.index().then(function(response){
            if (response.status == 200) {
              $scope.posts = response.data;
            }
          })
        };
        $scope.findCategory = function(){
          Category.findCate().then(function(response){
            if (response.status == 200) {
              $scope.cates = response.data;
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
        $scope.gotoCreate = function(){
            $state.go('post create');
            $rootScope.$title = 'Thêm bài viết';
        }
        $scope.create = function(){
            $scope.post.user_id = MeanUser.user._id;
            $scope.post.image = $scope.image;
            $scope.post.images = $scope.images;
            $scope.post.author = MeanUser.user.name;
            Post.create($scope.post).then(function(response){
              if(response.status == 200){
                $state.go('post')
              }
            })
        };
        $scope.edit = function(post){
            $state.go('post update', {id: post._id});
        }

        $scope.findOne = function(){
          Post.find($stateParams.id).then(function(response){
            if (response.status == 200) {
              $scope.post = response.data;
              $rootScope.$title = 'Cập nhật bài viết';
            }
          })
        }

        $scope.getPostReview = function()
        {
          Post.find($stateParams.id).then(function(response){
            if (response.status == 200) {

              var article = response.data;
              if (article.news_series_id) {
                Series.find(article.news_series_id).then(function(response){
                  article.series.push(response.data);
                })

              }
              $scope.article = article;
            }
          });
        }

        $scope.update = function(){
            $scope.post.updated_at = Date.now;
            $scope.post.image = $scope.image;
            for(var i in $scope.images)
                $scope.post.images.push($scope.images[i]);
            Post.update($stateParams.id, $scope.post).then(function(response){
              if (response.status == 200) {
                $state.go('post');
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
        $scope.deletePublished = function(post){
          if ($window.confirm('Please confirm?')) {
            Post.delete(post._id).then(function(response){
              if (response.status == 200) {
                $state.go('post publish');
              }
            })
          }
        }
        $scope.viewImage = function(){
            $scope.hinhanh = $scope.image;
        }

        $scope.viewImages = function(){
            $scope.hinhanhs = $scope.images;
        }
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };
        $scope.findHide = function(){
          $scope.hidePosts = [];
          angular.forEach(MeanUser.user.categories, function(value, key){
            Post.findByCateHide(value).then(function(response){
              $scope.hidePosts = [].concat($scope.hidePosts, response.data);
            })
          })
          // Post.findHide().then(function(response){
          //   if (response.status === 200) {
          //     $scope.hidePosts = response.data;
          //   }
          // })
        }
        $scope.published = function(post){
          if ($window.confirm('Please confirm?')) {
            Post.published(post._id).then(function(response){
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
        $scope.publishedPostReview = function(post){
          if ($window.confirm('Please confirm?')) {
            Post.published(post._id).then(function(response){
              if (response.status == 200) {
                $state.go('post publish');
              }
            })
          }
        }

    }
    angular
        .module('mean.admins')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', 'Global', 'Post', 'Category', 'Series', '$stateParams', '$state', '$http', '$location', '$window', '$rootScope', 'MeanUser'];

})();

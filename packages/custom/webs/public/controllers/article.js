(function() {
    'use strict';

    /* jshint -W098 */

    function ArticleController($scope, $rootScope, Global, Article, Series, Comments, $stateParams, $state, $location, $http, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'search'
        };

        $scope.getArticle = function(){
            Article.getArticle($stateParams.slug).then(function(response){
              if(response.data === null){
                $state.go('home');
              }else {
                var article = response.data;
                $rootScope.$title = article.title;
                if (article.news_series_id) {
                  Article.top10ViewPostBySeries(article.news_series_id).then(function(response){
                    if (response.status === 200) {
                      $scope.top10postbyseries = response.data;
                    }
                  });
                  Series.find(article.news_series_id).then(function(response){
                    if (response.status == 200) {
                      article.series.push(response.data);
                    }
                  });
                }else {
                  $scope.top10postbyseries = [];
                }
                $scope.article = article;

                Article.pushViewCount(article._id).then(function(response){});

                Comments.getCommentByPost(article._id).then(function(response){
                  if (response.status === 200) {
                    $scope.totalComment = response.data.length;
                    var comments = response.data;
                    angular.forEach(comments, function(value, key){
                      Comments.getUserById(value.user_id).then(function(response){
                        if (response.status === 200) {
                          value.user = response.data;
                        }
                      })
                    }, this);
                    $scope.comments = comments;
                    //console.log($scope.comments);
                    //console.log($scope.totalComment);
                  }
                });

              }
            })
        }
        $scope.postComment = function(){

          if (MeanUser.loggedin) {
            $scope.comment.post_id = $scope.article._id;
            $scope.comment.user_id = MeanUser.user._id;

            Comments.postComment($scope.comment).then(function(response){
              if (response.status === 200) {
                var comments = response.data;
                Comments.getUserById(comments.user_id).then(function(response){
                  if (response.status === 200) {
                    comments.user = response.data;
                    if ($scope.comments.length > 0) {
                      $scope.comments = [].concat($scope.comments, comments);
                    }else {
                      $scope.comments = [].concat([], comments);
                    }
                    $scope.totalComment = $scope.comments.length;
                  }
                });
              }
            })

          }else{
            $scope.isLogin = false;
          }
        }
    }

    angular
        .module('mean.webs')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', '$rootScope', 'Global', 'Article', 'Series', 'Comments', '$stateParams', '$state', '$location', '$http', 'MeanUser'];

})();

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
              if(response.status == 200){
                var article = response.data;
                $rootScope.$title = article.title;
                Series.find(article.news_series_id).then(function(response){
                  if (response.status == 200) {
                    article.series.push(response.data);
                  }
                  $scope.article = article;
                });
                Article.pushViewCount(article._id).then(function(response){});

                Comments.getCommentByPost(article._id).then(function(response){
                  if (response.status === 200) {
                    console.log(response.data);
                    $scope.comments = response.data;
                  }else{
                    $scope.hasComment = false;
                  }
                })
              }
            })
        }
        $scope.postComment = function(){

          if (MeanUser.loggedin) {
            $scope.comment.post_id = $scope.article._id;
            $scope.comment.user_id = MeanUser.user._id;
            //console.log($scope.comment);
            Comments.postComment($scope.comment).then(function(response){
              if (response.status === 200) {
                console.log(response);
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

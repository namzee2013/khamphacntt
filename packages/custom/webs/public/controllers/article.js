(function() {
    'use strict';

    /* jshint -W098 */

    function ArticleController($scope, $rootScope, Global, Article, Series, $stateParams, $state, $location, $http) {
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
              }
            })
        }
    }

    angular
        .module('mean.webs')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['$scope', '$rootScope', 'Global', 'Article', 'Series', '$stateParams', '$state', '$location', '$http'];

})();

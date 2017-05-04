(function() {
    'use strict';

    /* jshint -W098 */

    function WelcomeController($scope, $rootScope, Global, Welcome, Series, $stateParams, $state, $location, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'welcome'
        };
        var page = 1, limit = 5;

        $scope.getPostsByCategory = function(){
            $rootScope.$title = 'Bài viết theo danh mục';
            $scope.isLoading = true;
            Welcome.getCategoryBySlug($stateParams.slug).then(function(response){

                var id = response.data._id;
                Welcome.getPostByCategory(id, page, limit).then(function(response){

                  if (response.data.total === 0) {
                    $scope.postsByCate = [];
                  }else {
                    $scope.pageByCate = response.data.page;
                    $scope.pagesByCate = response.data.pages;
                    $scope.limit = response.data.limit;
                    $scope.category_id = id;
                    $scope.totalByCate = response.data.total;

                    var postsByCate = response.data.data;
                    angular.forEach(postsByCate, function(value, key) {
                      if (value.news_series_id) {
                        Series.find(value.news_series_id).then(function(response){
                            value.series.push(response.data);
                            var newDay = Date.now()-Date.parse(value.created_at);
                            if (Math.round(newDay / (1000*60*60*24)) < 15) {
                              value.new = 'new';
                            }
                        })
                      }
                    }, this);
                    $scope.postsByCate = postsByCate;
                  }
                });
            });
            $scope.isLoading = false;
        }

        $scope.loadMoreByCategory = function(){
            if ($scope.postsByCate.length >= $scope.totalByCate) return;
            $scope.isLoading = true;
            Welcome.getPostByCategory($scope.category_id, $scope.pageByCate + 1, $scope.limit).then(function(response){
                $scope.pageByCate = response.data.page;
                $scope.pagesByCate = response.data.pages;
                $scope.limit = response.data.limit;
                $scope.totalByCate = response.data.total;

                var postsByCate = response.data.data;
                angular.forEach(postsByCate, function(value, key) {
                  if (value.news_series_id) {
                    Series.find(value.news_series_id).then(function(response){
                        value.series.push(response.data);
                        var newDay = Date.now()-Date.parse(value.created_at);
                        if (Math.round(newDay / (1000*60*60*24)) < 15) {
                          value.new = 'new';
                        }
                    })
                  }

                }, this);

                $scope.postsByCate = [].concat($scope.postsByCate, postsByCate);
            });
            $scope.isLoading = false;
        }

        $scope.getPostsBySeries = function(){
          $rootScope.$title = 'Bài viết theo Series';
          $scope.isLoading = true;
          Welcome.getSeriesBySlug($stateParams.slug).then(function(response){
              var _id = response.data._id;
              Welcome.getPostBySeries(_id, page, limit).then(function(response){

                  $scope.pageBySeries = response.data.page;
                  $scope.pagesBySeries = response.data.pages;
                  $scope.limit = response.data.limit;
                  $scope.news_series_id = _id;
                  $scope.totalBySeries = response.data.total;

                  var postsBySeries = response.data.data;
                  angular.forEach(postsBySeries, function(value, key) {
                      Series.find(value.news_series_id).then(function(response){
                          value.series.push(response.data);
                          var newDay = Date.now()-Date.parse(value.created_at);
                          if (Math.round(newDay / (1000*60*60*24)) < 15) {
                            value.new = 'new';
                          }
                      })
                  }, this);
                  $scope.postsBySeries = postsBySeries;
              });
          });
          $scope.isLoading = false;
        }
        $scope.loadMoreBySeries = function(){
            if ($scope.postsBySeries.length >= $scope.totalBySeries) return;
            $scope.isLoading = true;
            Welcome.getPostBySeries($scope.news_series_id, $scope.pageBySeries + 1, $scope.limit).then(function(response){
                $scope.pageBySeries = response.data.page;
                $scope.pagesBySeries = response.data.pages;
                $scope.limit = response.data.limit;
                $scope.totalBySeries = response.data.total;

                var postsBySeries = response.data.data;
                angular.forEach(postsBySeries, function(value, key) {
                    Series.find(value.news_series_id).then(function(response){
                        value.series.push(response.data);
                        var newDay = Date.now()-Date.parse(value.created_at);
                        if (Math.round(newDay / (1000*60*60*24)) < 15) {
                          value.new = 'new';
                        }
                    })
                }, this);

                $scope.postsBySeries = [].concat($scope.postsBySeries, postsBySeries);
            });
            $scope.isLoading = false;
        }
        $scope.top10Post = function(){
          Welcome.top10Post().then(function(response){
            if (response.status === 200) {
              $scope.top10posts = response.data;
            }
          })
        }
    }
    angular
        .module('mean.webs')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', '$rootScope', 'Global', 'Welcome', 'Series', '$stateParams', '$state', '$location', '$http'];

})();

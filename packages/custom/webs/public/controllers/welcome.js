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
                var _id = response.data._id;
                Welcome.getPostByCategory(_id, page, limit).then(function(response){

                    $scope.pageByCate = response.data.page;
                    $scope.pagesByCate = response.data.pages;
                    $scope.limit = response.data.limit;
                    $scope.category_id = _id;
                    $scope.totalByCate = response.data.total;

                    var postsByCate = response.data.data;
                    angular.forEach(postsByCate, function(value, key) {
                        Series.find(value.news_series_id).then(function(response){
                            value.series.push(response.data);
                        })
                    }, this);
                    $scope.postsByCate = postsByCate;
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
                    Series.find(value.news_series_id).then(function(response){
                        value.series.push(response.data);
                    })
                }, this);

                $scope.postsByCate = [].concat($scope.postsByCate, postsByCate);
            });
            $scope.isLoading = false;
        }
    }
    angular
        .module('mean.webs')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$scope', '$rootScope', 'Global', 'Welcome', 'Series', '$stateParams', '$state', '$location', '$http'];

})();

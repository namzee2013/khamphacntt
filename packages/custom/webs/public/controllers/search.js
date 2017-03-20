(function() {
    'use strict';

    /* jshint -W098 */

    function SearchController($scope, $rootScope, Global, Search, $stateParams, $state, $location, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'search'
        };
        var page = 1, limit = 5;

        $scope.gotoSearch = function(key, text){
            $state.go('search', {'key': key,'text': text});

        }
        $scope.key = 'title';
        $scope.search = function(){
            var params = $location.search()
            $scope.isLoading = true;
            Search.searchByKey(params.key, params.text, page, limit).then(function (response) {
              if (response.status == 200) {
                $scope.articles = response.data.data;
                $scope.page = response.data.page;
                $scope.pages = response.data.pages;
                $scope.limit = response.data.limit;
                $scope.text = params.text;
                $scope.total = response.data.total;
                $scope.key = response.data.key;
              }

            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };
        $scope.loadMore = function () {
            if ($scope.articles.length >= $scope.total) return;
            $scope.isLoading = true;
            Search.searchByKey($scope.key, $scope.text, $scope.page + 1, $scope.limit).then(function (response) {
                $scope.articles = [].concat($scope.articles, response.data.data);
                $scope.page = response.data.page;
                $scope.pages = response.data.pages;
                $scope.limit = response.data.limit;
                $scope.total = response.data.total;
                $scope.key = response.data.key;
            }, function (error) {
                console.log('error', error);
            }).finally(function () {
                $scope.isLoading = false;
            });
        };

        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            readOnly: 'nocursor',
            mode: 'xml',
        };




    }

    angular
        .module('mean.webs')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$rootScope', 'Global', 'Search', '$stateParams', '$state', '$location', '$http'];

})();

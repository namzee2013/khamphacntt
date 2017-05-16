'use strict';

angular.module('mean.system').controller('IndexController', ['$scope','Global','Welcome','Series',
  function ($scope,Global,Welcome,Series) {
    $scope.global = Global;
    var page = 1, limit = 5;
    $scope.getAllPost = function(){
      $scope.isLoading = true;
      Welcome.getAllPost(page, limit).then(function(response){
        if (response.data.total === 0) {
          $scope.postsByCate = [];
        }else {
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
          $scope.postsByCate = postsByCate;
        }
      });
      $scope.isLoading = false;
    }
    $scope.loadMoreByCategory = function(){
        if ($scope.postsByCate.length >= $scope.totalByCate) return;
        $scope.isLoading = true;
        Welcome.getAllPost($scope.pageByCate + 1, $scope.limit).then(function(response){
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
    $scope.top10Post = function(){
      Welcome.top10Post().then(function(response){
        if (response.status === 200) {
          $scope.top10posts = response.data;
        }
      })
    }
    $scope.sites = [{
      'name': 'makeapoint',
      'text': 'Makeapoint is a platform to craft and fine-tune ideas and messages providing a graphical experience which brough an offline methodlogy online',
      'author': 'Linnovate',
      'link': 'http://www.linnovate.net',
      'image': '/meanStarter/assets/img/makeapoint.png'
    }, {
      'name': 'Cactus Intranet',
      'text': 'Cactus Intranet is an enterprise social network with features like real-time newsfeed, notifications, groups, events, polls, referral system etc. The system has role based permission system, allowing different stakeholders access and controls relevant to them.',
      'author': 'QED42',
      'link': 'http://www.qed42.com',
      'image': '/meanStarter/assets/img/cactus.png'
    }];
    $scope.packages = {
      'gmap': {
        'name': 'gmap',
        'text': 'gmap lets you add geographical information to your applications objects',
        'author': 'Linnovate',
        'link': 'http://www.qed42.com',
        'image': '/meanStarter/assets/img/gmap.png'
      },
      'upload': {
        'name': 'Upload',
        'text': 'Upload lets you add upload functionality to MEAN stack',
        'author': 'Linnovate',
        'link': 'http://www.linnovate.net',
        'image': 'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      },
      'socket': {
        'name': 'Socket',
        'text': 'Socket.io support',
        'author': 'Linnovate',
        'link': 'http://www.linnovate.net',
        'image': 'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      }
    };

    $scope.docs = [{
      text: 'Overview',
      link: 'http://learn.mean.io/#mean-technologies'
    }, {
      text: 'Packages',
      link: 'http://learn.mean.io/#mean-packages'
    }, {
      text: 'CLI',
      link: 'http://learn.mean.io/#mean-cli'
    }, {
      text: 'Network',
      link: 'http://learn.mean.io/#mean-mean-network'
    }, {
      text: 'Overriding',
      link: 'http://learn.mean.io/#mean-packages-overriding-the-default-layouts'
    }, {
      text: 'Contribution',
      link: 'http://learn.mean.io/#mean-packages-contributing-your-package'
    }];

    $scope.communities = [{
      link: 'https://facebook.com/groups/mean.io/',
      text: 'Informal support, news and just hanging out',
      icon: 'facebook'
    }, {
      link: 'https://github.com/linnovate/mean/',
      text: 'Issues, Support, Code discussions and PRs',
      icon: 'facebook'
    }, {
      link: 'https://gitter.im/linnovate/mean/',
      text: 'Support and Technical discussions',
      icon: 'gitter'
    }, {
      link: 'https://hangout.mean.io/',
      text: 'Video support, shared coding and to meet the people behind mean.io',
      icon: 'hangout'
    }];

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i += 1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
  }
]);

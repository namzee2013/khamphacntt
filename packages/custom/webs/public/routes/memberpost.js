(function() {
    'use strict';

    function MemberPost($stateProvider) {
        $stateProvider.state('memberpost', {
            url: '/profile/post',
            templateUrl: 'webs/views/member/post.html',
            
        }).state('memberpost create', {
          url: '/profile/post/create',
          templateUrl: 'webs/views/member/createpost.html',

        }).state('memberpost update', {
          url: '/profile/post/update/:id',
          templateUrl: 'webs/views/member/update.html',

        })
        ;
    }

    angular
        .module('mean.webs')
        .config(MemberPost);

    MemberPost.$inject = ['$stateProvider'];

})();

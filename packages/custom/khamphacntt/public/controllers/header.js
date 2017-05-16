'use strict';

angular.module('mean.system').controller('HeaderController', ['User','$scope', '$rootScope', 'Menus', 'MeanUser', '$state',
  function (User, $scope, $rootScope, Menus, MeanUser, $state) {
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $rootScope.$title = 'Trang Chu';
    var vm = this;

    vm.menus = {};
    vm.hdrvars = {
      authenticated: MeanUser.loggedin,
      user: MeanUser.user,
      isAdmin: MeanUser.isAdmin,
      isManagement: false
    };

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu (name, defaultMenu) {
      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function (menu) {
        vm.menus[name] = menu
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function () {
      queryMenu('main', defaultMainMenu);

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin,
        isManagement: MeanUser.user.roles.indexOf('management') > -1
      }

    });

    vm.logout = function () {
      MeanUser.logout()
    };

    $rootScope.$on('logout', function () {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false,
        isManagement: false
      };
      queryMenu('main', defaultMainMenu);
      $state.go('home');
    });
  }
]);

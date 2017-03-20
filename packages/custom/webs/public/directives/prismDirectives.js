'use strict';
angular
  .module('mean.admins')
  .directive('prism', function () {
  return {
    restrict: 'C',
    link: function ($scope, element, attrs) {
        element.ready(function() {
            Prism.highlightElement(element[0]);
        });
    }
  }
});

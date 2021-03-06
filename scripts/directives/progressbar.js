'use strict';

/**
 * @ngdoc directive
 * @name designPrinciplesApp.directive:progressBar
 * @description
 * # progressBar
 */
angular.module('designPrinciplesApp')
	.directive("progressbar", function () {
    return {
      restrict: "A",
      scope: {
          total: "=",
          current: "="
      },
      link: function (scope, element) {
        scope.$watch("current", function (value) {
          element.css("width", scope.current / scope.total * 100 + "%");
        });
        scope.$watch("total", function (value) {
          element.css("width", scope.current / scope.total * 100 + "%");
        })
      }
    };
});

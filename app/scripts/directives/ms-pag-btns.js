'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msPagBtns
 * @description
 * # msPagBtns
 */
angular.module('msAppApp')
  .directive('msPagBtns', function () {
    var directiveDefinitionObject = {
      restrict: "EA",
      replace: true,
      templateUrl: 'scripts/directives/ms-pag-btns.html'
    };

    return directiveDefinitionObject;
  });

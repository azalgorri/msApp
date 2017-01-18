'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:focusMe
 * @description
 * # focusMe
 */
angular.module('msAppApp')
  .directive('focusMe', function () {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.focusMe, function(value) {
          if(value === true) {
            element[0].focus();
          }
        });
      }
    };
  });

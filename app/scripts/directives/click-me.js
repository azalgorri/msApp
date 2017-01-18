'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:clickMe
 * @description
 * # clickMe
 */
angular.module('msAppApp')
  .directive('clickMe', function () {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(attrs.clickMe, function(value) {
          if(value === true) {
            element[0].click();
          }
        });
      }
    };
  });

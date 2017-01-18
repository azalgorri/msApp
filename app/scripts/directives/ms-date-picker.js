'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msDatePicker
 * @description
 * # msDatePicker
 */
angular.module('msAppApp')
  .directive('msDatePicker', function () 
  {
    var directiveDefinitionObject = {
      restrict: "EA",
      replace: true,
      templateUrl: 'scripts/directives/ms-date-picker.html',
      scope:{
        model:"="
      }
    };

    return directiveDefinitionObject;
  });

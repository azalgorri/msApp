'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msAuxiliarFichajes
 * @description
 * # msAuxiliarFichajes
 */
angular.module('msAppApp')
  .directive('msAuxiliarFichajes', function () {
    var directiveDefinitionObject = {
      restrict: "EA",
      replace: true,
      templateUrl: 'ms-auxiliar-fichajes.html',
      scope: {
        model: "="
      }
    };

    return directiveDefinitionObject;
  });

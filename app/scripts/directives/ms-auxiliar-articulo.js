'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msAuxiliarArticulo
 * @description
 * # msAuxiliarArticulo
 */
angular.module('msAppApp')
  .directive('msAuxiliarArticulo', function () 
  {
    var directiveDefinitionObject = {
      restrict: "EA",
      replace: true,
      templateUrl: 'ms-auxiliar-articulo.html',
      scope: {
        model: "="
      },
      link: function (scope, element, attrs)
      {
        scope.fotoIndex = 0;

        scope.selecFoto = function (index)
        {
          scope.fotoIndex = index;
        };
      }
    };

    return directiveDefinitionObject;
  });

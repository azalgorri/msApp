'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msAuxiliarMensaje
 * @description
 * # msAuxiliarMensaje
 */
angular.module('msAppApp')
  .directive("msAuxiliarMensaje",['$timeout', function($timeout)
  {
    var directiveDefinitionObject =
    {
      restrict: "EA",
      replace: true,
      templateUrl: 'scripts/directives/ms-auxiliar-mensaje.html',
      scope: {
        model: "=",
        autoclose: "="
      },
      link: function (scope, iElement, iAttrs, controller, transcludeFn)
      {
        var ac = scope.autoclose ? scope.autoclose : 1500;

        scope.types = Mensaje.types;
        scope.lastFondo = null;

        scope.$watch('model.mensaje', function ()
        {
          if(scope.model.mensaje)
          {
            scope.model.changeView(scope.model.ventanas.auxiliar.mensaje, scope.model.fondo);

            if(scope.model.mensaje.type == Mensaje.types.error ||
              scope.model.mensaje.type == Mensaje.types.success)
            {
              $timeout(function () {
                scope.model.scopes.footer.salir();
                scope.model.mensaje.type = Mensaje.types.normal;
              }, ac)
            }
          }
        });
      }
    };

    return directiveDefinitionObject;
  }]);

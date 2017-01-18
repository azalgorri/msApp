'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('footerCtrl', [ '$scope', '$http', '$filter', '$translate', '$timeout', '$compile', 'glService', 'selecService', 'crudService', 'staffService',
    function ($scope, $http, $filter, $translate, $timeout, $compile, glService, selecService, crudService, staffService)
    {
      $scope.gl = glService;
      $scope.sel = selecService;
      $scope.crud = crudService;
      $scope.staff = staffService;
      $scope.funcWaiting = null;

      $scope.forms = {
        newCliente: false
      };
      $scope.attempted = false;

      $scope.toggles = {
        newClienteForm: 0
      };

      $scope.gl.scopes.footer = $scope;

      $scope.salir = function (option)
      {
        var main = '/main-menu';

        switch ($scope.gl.modulo)
        {
          case 'client-dashboard':

            switch ($scope.gl.actualView)
            {
              case $scope.gl.ventanas.principal:
                window.location.href = $scope.crud.appNamespace + main;
                break;

              case $scope.gl.ventanas.formulario:
                $scope.gl.changeView($scope.gl.ventanas.principal);
                break;

              case $scope.gl.ventanas.seleccion:
                $scope.gl.changeView($scope.gl.ventanas.formulario);
                break;

              case $scope.gl.ventanas.auxiliar.mensaje:
              case $scope.gl.ventanas.vpr:
                $scope.gl.changeView($scope.gl.ventanas.formulario);
                break;
            }

            break;

          case 'staff-control':

            switch ($scope.gl.actualView)
            {
              case $scope.gl.ventanas.principal:
                window.location.href = $scope.crud.appNamespace + main;
                break;

              case $scope.gl.ventanas.auxiliar.mensaje:
              // case $scope.gl.ventanas.auxiliar.articulo:
              case $scope.gl.ventanas.auxiliar.horario:
                $scope.gl.lastView = $scope.gl.ventanas.formulario;
                $scope.gl.changeView($scope.gl.ventanas.auxiliar.fichajes);
                break;

              case $scope.gl.ventanas.auxiliar.fichajes:
                $scope.gl.changeView($scope.gl.ventanas.formulario);
                break;

              case $scope.gl.ventanas.formulario:
                $scope.gl.changeView($scope.gl.ventanas.principal);
                break;

              case $scope.gl.ventanas.seleccion:
                $scope.gl.changeView($scope.gl.ventanas.formulario);
                break;

              default:
                $scope.gl.changeView($scope.gl.lastView);
            }

            break;

          default:
          {
            $scope.gl.fondo = -1;
            $scope.gl.actualView += -1;
          }
        }
      };

      $scope.seleccionar = function ()
      {
        $scope.sel.doSelection($scope);
      };

      $scope.grabarCliente = function ()
      {
        var response = false;

        $scope.gl.loading = true;

        switch ($scope.gl.submodulo)
        {
          case $scope.gl.submodulos.conModCliente:
            response = $scope.crud.execute('update','cliente',$scope.gl.modulo, $scope.gl.cliSelected);
            response.success(function(data, status, headers, config)
            {
              $translate(['loc_ClienteModificado', 'loc_ClienteErrorGuardar']).then(function (translations) {
                var success = [translations.loc_ClienteModificado];
                var error = [translations.loc_ClienteErrorGuardar];

                $scope.gl.loading = false;

                if(data.operation && data.cliente)
                {
                  $scope.gl.showMessage(Mensaje.types.success, success,  $scope.gl.ventanas.formulario);
                  // Añadimos el cliente modificado a la vista
                  $scope.gl.scopes.clientes.data.push(data.cliente);
                  $scope.gl.scopes.clientes.toggles.modCliente += 1;
                }
                else
                  $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);

              });
            });
            break;

          case $scope.gl.submodulos.altaCliente:
            response = $scope.crud.execute('create','cliente',$scope.gl.modulo, $scope.gl.cliSelected);
            response.success(function(data, status, headers, config)
            {
              $translate(['loc_ClienteCreado', 'loc_ClienteErrorGuardar']).then(function (translations) {
                var success = [translations.loc_ClienteCreado];
                var error = [translations.loc_ClienteErrorGuardar];

                $scope.gl.loading = false;

                // $scope.gl.alert(data.operation, success, error);
                if(data.operation && data.cliente)
                {
                  $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);

                  // Añadimos el nuevo cliente a la vista
                  $scope.gl.scopes.clientes.data.push(data.cliente);
                  $scope.gl.scopes.clientes.toggles.newCliente += 1;
                  angular.element(document.getElementById('grabarCliente_btn')).hide();
                }
                else
                  $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);
              });
            });
            break;
        }

        return response;
      };

      $scope.borrarCliente = function ()
      {
        $scope.gl.deleteFromDataById($scope.gl.scopes.clientes.data, $scope.gl.cliSelected);

        var response = $scope.crud.execute('delete','cliente',$scope.gl.modulo, $scope.gl.cliSelected);

        response.success(function(data, status, headers, config)
        {
          $translate(['loc_ClienteEliminado', 'loc_ClienteErrorBorrar']).then(function (translations) {
            var success = [translations.loc_ClienteEliminado];
            var error = [translations.loc_ClienteErrorBorrar];

            if(data.operation)
            {
              $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);
              $scope.gl.scopes.clientes.toggles.delCliente += 1;
            }
            else
              $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);

          });
        })
      };

      $scope.grabarVendedor = function ()
      {
        var response = false;

        response = $scope.crud.execute('update','vendedor',$scope.gl.modulo, $scope.gl.vendedor);
        response.success(function(data, status, headers, config)
        {
          $translate(['loc_VendedorGuardado', 'loc_VendedorErrorGuardar']).then(function (translations)
          {
            var success = [translations.loc_VendedorGuardado];
            var error = [translations.loc_VendedorErrorGuardar];

            if(data.operation)
              $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);
            else
              $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);
          });
        });

        return response;
      };

      $scope.confirmar = function (event)
      {
        switch (angular.element(event.currentTarget).attr('name'))
        {
          case 'borrarCliente_btn':
            $translate(['loc_confirmacionBorrado']).then(function (translations)
            {
              $scope.gl.showMessage(Mensaje.types.normal,[translations.loc_confirmacionBorrado], $scope.gl.ventanas.formulario);
              $scope.funcWaiting = $scope.borrarCliente;
            });
            break;
        }
      };

      $scope.isActive = function (btn)
      {
        var res = false;

        switch ($scope.gl.modulo)
        {
          case 'staff-control':
            switch (btn)
            {
              case 'salir_btn':
                res = true;
                break;
              case 'grabarVendedor_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.formulario);
                break;
              case 'seleccionar_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.seleccion);
                break;
              case 'guardarFichajes_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.fichajes
                && $scope.gl.scopes.fichajes.currentTab == 1
                && $scope.gl.vendedor.toSaveFichajes
                && $scope.gl.vendedor.toSaveFichajes.length > 0);
                break;
              case 'aniadirFichaje_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.fichajes
                && $scope.gl.scopes.fichajes.currentTab == 1);
                break;
              case 'ok_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.mensaje
                && $scope.gl.mensaje && $scope.gl.mensaje.type == Mensaje.types.normal);
                break;
            }
            break;

          case 'client-dashboard':
            switch (btn)
            {
              case 'salir_btn':
                if($scope.gl.mensaje)
                {
                  res = ($scope.gl.mensaje.type == Mensaje.types.normal)
                }
                else res = true;
                break;

              case 'nuevoCliente_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.principal);
                break;

              case 'borrarCliente_btn':
                res = (($scope.gl.actualView == $scope.gl.ventanas.formulario)
                && ($scope.gl.submodulo == $scope.gl.submodulos.conModCliente)
                && $scope.gl.newCliente_form.$valid);
                break;

              case 'ventasCliente_btn':
              case 'prestamosCliente_btn':
              case 'reservasCliente_btn':
                res = (($scope.gl.actualView == $scope.gl.ventanas.formulario)
                && ($scope.gl.submodulo == $scope.gl.submodulos.conModCliente));
                break;

              case 'grabarCliente_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.formulario
                && $scope.gl.newCliente_form.$valid);
                break;

              case 'ok_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.mensaje
                && $scope.gl.mensaje && $scope.gl.mensaje.type == Mensaje.types.normal);
                break;

              case 'seleccionar_btn':
                res = ($scope.gl.actualView == $scope.gl.ventanas.seleccion);
                break;
            }
            break;
        }

        return res;
      };

      $scope.$watch('newCliente_form.$valid', function(newVal)
      {
        var btn = angular.element(document.getElementById('grabarCliente_btn'));
        $scope.forms.newCliente = newVal;

        $scope.forms.newCliente ? btn.show() : btn.hide();
      });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('clientesCtrl', [ '$scope', '$timeout', '$filter', 'glService', 'selecService', 'crudService',
    function ($scope, $timeout, $filter, glService, selecService, crudService)
    {
      $scope.gl = glService;
      $scope.sel = selecService;
      $scope.crud = crudService;

      $scope.gl.modulo = 'client-dashboard';
      $scope.gl.submodulos = {
        conModCliente: 0,
        altaCliente: 1,
        ventasCliente: 2
      };
      $scope.gl.submodulo = $scope.gl.submodulos.conModCliente;
      $scope.gl.selectedIndex = 0;

      $scope.gl.scopes.clientes = $scope;

      $scope.completeObj = function ($event)
      {
        $scope.crud.addObjToData('desde', $filter('date')($scope.sel.fechas.desde, 'dd-MM-yyyy'));
        $scope.crud.addObjToData('hasta', $filter('date')($scope.sel.fechas.hasta, 'dd-MM-yyyy'));

        var ruta = ($event) ? $event.currentTarget.attributes.name.nodeValue : null;

        if(ruta)
          $scope.sel.selecType = ruta;

        // Show loading spinner.
        $scope.gl.loading = true;

        var response = $scope.crud.execute('complete','cliente', $scope.gl.modulo, $scope.gl.cliSelected, ruta);
        response.success(function(data, status, headers, config)
        {
          $scope.gl.cliSelected = data.cliente;

          if($scope.gl.cliSelected)
          {
            $scope.gl.scopes.vpr.totalValor = 0;
            $scope.gl.scopes.vpr.currentPage = 0;
            // Por defecto ponemos el tipo de tabla de ventas y prestamos
            $scope.gl.scopes.vpr.tipoTabla = $scope.gl.scopes.vpr.tipos.ventasPrestamos;
            $scope.gl.scopes.vpr.totalValor = 0;
            $scope.gl.scopes.vpr.totalUnidades = 0;

            switch ($scope.sel.selecType)
            {
              case 'ventas':
                $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.ventas;
                for(var x in $scope.gl.cliSelected.ventas)
                {
                  $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.ventas[x].neto;
                  $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.ventas[x].unidades;
                }
                break;

              case 'prestamos':
                $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.prestamos;
                for(var x in $scope.gl.cliSelected.prestamos)
                {
                  $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.prestamos[x].neto;
                  $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.prestamos[x].unidades;
                }
                break;

              case 'reservas':
                $scope.gl.scopes.vpr.tipoTabla = $scope.gl.scopes.vpr.tipos.reservas;
                $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.reservas;
                for(var x in $scope.gl.cliSelected.reservas)
                {
                  $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.reservas[x].precio;
                  $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.reservas[x].unid;
                }
                break;
            }

          }

          // Desbloqueamos vista
          $scope.gl.changeRoute($scope.gl.ventanas.vpr, ruta);
          $timeout(function () {
            $scope.gl.loading = false;
          })
        });
      };

      //----------------- TECLADO CLIENT DASHBOARD ------------------//
      // Globales y fijas
      // Con esta función vinculamos tb los input a las teclas
      var inputs = document.getElementsByTagName('input');
      for(var x in inputs)
        inputs[x].className += " mousetrap";
      Mousetrap.bind('esc', function(e) {
        document.getElementById('salir_btn').click();
      });
      // Letras de la derecha
      $scope.bindLetrasKeys = function (option)
      {
        for(var x in $scope.letras)
        {
          Mousetrap.unbind($scope.letras[x].toLowerCase());
          if(option)
          {
            Mousetrap.bind($scope.letras[x].toLowerCase(), function(e, combo) {
              document.getElementById(combo.toUpperCase()+'_btn').click();
            });
          }
        }
      };
      // Vinculación de teclas y control de foco
      $scope.$watch('gl.actualView', function (newValue)
      {
        // unbinding
        Mousetrap.unbind('enter'); Mousetrap.unbind('end');
        Mousetrap.unbind('right'); Mousetrap.unbind('left');
        Mousetrap.unbind('up'); Mousetrap.unbind('down');
        Mousetrap.unbind('+'); Mousetrap.unbind('-');
        Mousetrap.unbind('f1'); Mousetrap.unbind('f2');
        Mousetrap.unbind('f3'); Mousetrap.unbind('f4');

        switch (newValue)
        {
          // Clientes Paginación
          case $scope.gl.ventanas.principal:
            Mousetrap.bind('enter', function(e) {
              $scope.gl.scopes.clientes.selectCliente($scope.gl.selectedIndex);
              $scope.$apply();
            });
            Mousetrap.bind('right', function(e) {
              $scope.gl.selectedIndex += 1;
              $scope.$apply();
            });
            Mousetrap.bind('left', function(e) {
              if($scope.gl.selectedIndex > 0)
                $scope.gl.selectedIndex -= 1;
              $scope.$apply();
            });
            Mousetrap.bind('up', function(e) {
              if($scope.gl.selectedIndex > 0)
                $scope.gl.selectedIndex -= 4;
              $scope.$apply();
            });
            Mousetrap.bind('down', function(e) {
              $scope.gl.selectedIndex += 4;
              $scope.$apply();
            });
            Mousetrap.bind('+', function(e) {
              document.querySelector('#clientesPag_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('-', function(e) {
              document.querySelector('#clientesPag_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('ins', function(e) {
              document.querySelector('#nuevoCliente_btn img').click();
            });
            $scope.bindLetrasKeys(true);
            $timeout(function () {
              document.querySelector('input').focus();
            }, 0);
            break;
          // Formulario
          case $scope.gl.ventanas.formulario:
            Mousetrap.bind('f1', function(e) {
              document.getElementById('ventasCliente_btn').click();
            });
            Mousetrap.bind('f2', function(e) {
              document.getElementById('prestamosCliente_btn').click();
            });
            Mousetrap.bind('f3', function(e) {
              document.getElementById('reservasCliente_btn').click();
            });
            Mousetrap.bind('f4', function(e) {
              document.getElementById('borrarCliente_btn').click();
            });
            Mousetrap.bind('end', function(e) {
              document.getElementById('grabarCliente_btn').click();
            });
            $timeout(function () {
              document.getElementById('tarjetaAlta').focus();
            }, 0);
            break;
          // Seleccion
          case $scope.gl.ventanas.seleccion:
            Mousetrap.bind('up', function(e) {
              if($scope.sel.rowIndex != 0)
                $scope.sel.rowIndex -= 1;
              document.querySelectorAll('tbody tr')[$scope.sel.rowIndex].click();
            });
            Mousetrap.bind('down', function(e) {
              if($scope.sel.rowIndex < document.querySelectorAll('tbody tr').length-1)
                $scope.sel.rowIndex += 1;
              document.querySelectorAll('tbody tr')[$scope.sel.rowIndex].click();
            });
            break;
          // Auxiliar
          case $scope.gl.ventanas.auxiliar.mensaje:
            Mousetrap.bind('enter', function(e) {
              document.getElementById('ok_btn').click();
            });
            break;
          // VPR
          case $scope.gl.ventanas.vpr:
            Mousetrap.bind('+', function(e) {
              document.querySelector('#vprCliente_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('-', function(e) {
              document.querySelector('#vprCliente_box [name="anteriores_btn"] img').click();
            });
            break;
        }
      });

      // Desactivación de las teclas por defecto del navegador que interfieren con la aplicaición
      document.onkeydown = function (e) {
        // f1, f2, f3, f4
        if(e.which === 112 || e.which === 113 || e.which === 114 || e.which === 115) {
          return false;
        }
      };

      document.getElementById("container_box").style.display = 'block';
    }]);

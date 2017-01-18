'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:VendedoresCtrl
 * @description
 * # VendedoresCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('vendedoresCtrl', [ '$scope', '$timeout', '$filter', '$translate', 'glService', 'selecService', 'crudService', '$http', 'staffService', 'uiCalendarConfig',
    function ($scope, $timeout, $filter, $translate, glService, selecService, crudService, $http, staffService, uiCalendarConfig)
    {
      $scope.gl = glService;
      $scope.sel = selecService;
      $scope.crud = crudService;
      $scope.staff = staffService;

      $scope.gl.modulo = 'staff-control';
      $scope.gl.scopes.vendedores = $scope;

      $scope.tipoFichaje = [];
      $scope.focusedIndex = -1;
      $scope.gl.submodulos ={
        modifVendedor: 0
      };

      // Show loading spinner.
      $scope.gl.loading = true;

      // crud
      // var res = $scope.crud.execute('read','vendedores', $scope.gl.modulo);
      var res = $http.get('data/find-vendedores.json');

      res.then(function(data, status, headers, config)
      {
        $scope.gl.data.vendedores = data.data.vendedores;

        // Desbloqueamos vista
        $timeout(function () {
          $scope.gl.loading = false;
          document.getElementById("curtain").style.display = 'block';
          $scope.gl.changeView(1);
        });
      });

      $scope.datePickerModel =
      {
        desde: new Date(),
      };

      // Cabecera de la tabla de entradas y salidas
      $translate(['loc_Fecha', 'loc_Tipo', 'loc_Entrada', 'loc_Salida', 'loc_Total']).then(function (translations) {
        $scope.theadCols = [translations.loc_Fecha, translations.loc_Tipo, translations.loc_Entrada, translations.loc_Salida, translations.loc_Total];
      });
      // Tipo de fichajes
      $translate(['loc_Entrada', 'loc_Salida', 'loc_Pausa']).then(function (translations) {
        $scope.tipoFichaje.push(translations.loc_Entrada);
        $scope.tipoFichaje.push(translations.loc_Salida);
        $scope.tipoFichaje.push(translations.loc_Pausa);
      });

      $scope.selectVendedor = function (index)
      {
        var aux = [];
        var venHTML = $('.vendedorDiv')[index];

        $scope.focusedIndex == index;
        $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.fichajes);
        $scope.gl.vendedor = $scope.gl.data.vendedores[index];
        // $(venHTML).hasClass('focusedVendedor') ? $(venHTML).removeClass('focusedVendedor') : $(venHTML).addClass('focusedVendedor');

        $scope.crud.execute('select', 'vendedor', $scope.gl.modulo, $scope.gl.vendedor);

        $scope.staff.reloadFichajes($scope.gl.vendedor);
        // $scope.gl.scopes.calendarios.recalculateFichajes($scope.gl.vendedor);
      };
      $scope.isSelected = function (index)
      {
        var ven = $scope.gl.data.vendedores[index];

        for (var x in $scope.gl.vendedoresSeleccionados)
        {
          if($scope.gl.vendedoresSeleccionados[x].id == ven.id)
            return true;
        }
        return false;
      };
      $scope.isFocused = function (index)
      {
        var res = false;

        if($scope.focusedIndex == index)
          res = true;

        return res
      };
      $scope.addVendedor = function (index, event)
      {
        var ven = $scope.gl.data.vendedores[index];

        if(event.currentTarget.className.includes('selectedVendedor'))
        {
          // Quitar vendedor de los seleccionados
          var x = angular.element(event.currentTarget).removeClass('selectedVendedor');
          $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.horarios, ven.id);
          $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.vacaciones, ven.id);
        }
        else
        {
          // Añadir vendedor a los seleccionados
          var x = angular.element(event.currentTarget).addClass('selectedVendedor');
          $scope.gl.scopes.calendarios.addEvent($scope.gl.scopes.calendarios.calendars.horarios, ven);
          $scope.gl.scopes.calendarios.addEvent($scope.gl.scopes.calendarios.calendars.vacaciones, ven);
        }
      };
      $scope.editarFicha = function (ven)
      {
        $scope.gl.submodulo = $scope.gl.submodulos.modifVendedor;

        if(!ven)
          ven = $scope.gl.vendedor;

        $scope.gl.changeView($scope.gl.ventanas.formulario);
      };
      $scope.showModal = function (event)
      {
        if(event.currentTarget.id == 'diarioLaboral_btn')
        {
          $scope.gl.showModal1 = true;
          $timeout(function () {
            $('div.fc-toolbar > div.fc-right > button').click();
          });
        }
      };
      $scope.showFichajesDialog = function ()
      {
        $scope.gl.scopes.fichajes.filtroJornada = {};

        if($scope.gl.vendedor)
        {
          $scope.gl.scopes.calendarios.recalculateFichajes($scope.gl.vendedor);
        }

        $scope.gl.changeView($scope.gl.ventanas.auxiliar.fichajes,$scope.gl.ventanas.formulario);

        $timeout(function () {
          $scope.gl.scopes.calendarios.clickToday()
        });
      };

      $scope.showHorarioLaboral = function ()
      {
        $scope.gl.changeView($scope.gl.ventanas.auxiliar.horario, $scope.gl.ventanas.formulario);
      };

      $scope.showFichajesPorDiaDialog = function (event)
      {
        // Filtrar data por fecha de jornada
        var data = $scope.gl.scopes.fichajes.data;
        $scope.gl.scopes.fichajes.filtroJornada.fechaStr = event.id;
        $scope.gl.scopes.fichajes.currentTab = 1;
      };

      document.getElementById("container_box").style.display = 'block';

      //----------------- TECLADO STAFF CONTROL ------------------//
      // Globales y fijas
      // Con esta función vinculamos tb los input a las teclas
      var inputs = document.getElementsByTagName('input');
      // for(var x in inputs)
      //   inputs[x].className += " mousetrap";
      Mousetrap.bind('esc', function(e) {
        document.getElementById('salir_btn').click();
      });

      // Vinculación de teclas
      $scope.$watch('gl.actualView', function (newValue)
      {
        // unbinding
        Mousetrap.unbind('enter'); Mousetrap.unbind('end');
        Mousetrap.unbind('right'); Mousetrap.unbind('left');
        Mousetrap.unbind('up'); Mousetrap.unbind('down');
        Mousetrap.unbind('+'); Mousetrap.unbind('-');
        Mousetrap.unbind('f1'); Mousetrap.unbind('f2');
        Mousetrap.unbind('f3'); Mousetrap.unbind('f4');
        Mousetrap.unbind('f5'); Mousetrap.unbind('f6');
        Mousetrap.unbind('f7'); Mousetrap.unbind('f8');

        switch (newValue)
        {
          // Vendedores
          case $scope.gl.ventanas.principal:
            Mousetrap.bind('enter', function(e) {
              // $scope.selectVendedor($scope.focusedIndex);
              document.querySelector('.focusedVendedor').click();
              $scope.$apply();
            });
            Mousetrap.bind('right', function(e) {
              if($scope.focusedIndex < $scope.gl.data.vendedores.length)
                $scope.focusedIndex += 1;
              else
                $scope.focusedIndex = 0;

              $scope.$apply();
            });
            Mousetrap.bind('left', function(e) {
              if($scope.focusedIndex > 0)
                $scope.focusedIndex -= 1;
              $scope.$apply();
            });
            Mousetrap.bind('+', function(e) {
              document.querySelector('#staffControlPrincipal_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('-', function(e) {
              document.querySelector('#staffControlPrincipal_box [name="siguientes_btn"] img').click();
            });

            $timeout(function () {
              $scope.selectedIndex = -1;
              // document.querySelectorAll('.vendedorDiv')[0].focus();
            }, 0);
            break;
          // Formulario
          case $scope.gl.ventanas.formulario:
            Mousetrap.bind('f3', function(e) {
              document.getElementById('horarioLaboral_btn').click();
            });
            Mousetrap.bind('f4', function(e) {
              document.getElementById('diarioLaboral_btn').click();
            });
            Mousetrap.bind('f5', function(e) {
              document.getElementById('historialLaboral_btn').click();
            });
            Mousetrap.bind('f6', function(e) {
              document.getElementById('venta_btn').click();
            });
            Mousetrap.bind('+', function(e) {
              document.querySelector('#staffControlFormulario_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('-', function(e) {
              document.querySelector('#staffControlFormulario_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('end', function(e) {
              document.getElementById('grabarVendedor_btn').click();
            });
            break;
          // Calendario fichajes
          case $scope.gl.ventanas.auxiliar.fichajes:
            Mousetrap.bind('+', function(e) {
              document.querySelector('#auxiliarFichajes_box [name="siguientes_btn"] img').click();
            });
            Mousetrap.bind('-', function(e) {
              document.querySelector('#auxiliarFichajes_box [name="anteriores_btn"] img').click();
            });
            Mousetrap.bind('f7', function(e) {
              document.getElementById('aniadirFichaje_btn').click();
            });
            Mousetrap.bind('f8', function(e) {
              document.getElementById('guardarFichajes_btn').click();
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
    }]);

'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:FichajesPagCtrl
 * @description
 * # FichajesPagCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('fichajesPagCtrl', [ '$scope', '$http', '$filter', '$translate', '$timeout', '$ngConfirm','glService', 'crudService', 'selecService', 'staffService', 'uiCalendarConfig',
    function ($scope, $http, $filter, $translate, $timeout, $ngConfirm,glService, crudService, selecService, staffService, uiCalendarConfig)
    {
      $scope.gl = glService;
      $scope.crud = crudService;
      $scope.sel = selecService;
      $scope.staff = staffService;

      // Global seleccion
      $scope.gl.scopes.fichajes = $scope;

      $scope.currentPage = 0;
      $scope.pageSize = $scope.gl.calculateBySize(); // Esta la cantidad de registros que deseamos mostrar por p?gina
      $scope.pages = [];
      $scope.data = [];
      $scope.filteredData = [];
      $scope.fichaje = null;
      $scope.theadCols = [];
      $scope.detalleDia = false;
      $scope.filtroJornada = {};
      $scope.currentTab = 0;
      $scope.loc = {};
      $scope.currentObj = {};
      $scope.saveFichajes = false;
      $scope.newFichaje = false;
      $scope.newFic =
      {
        fecha: new Date(),
        tipo: 'Trabajo'
      };

      // TOGGLES para controlar respuestas de las promesas
      $scope.toggles = {
        delFichaje: 0,
        newFichaje: 0
      };

      // Location
      $translate(['loc_AniadirFichaje', 'loc_Guardar', 'loc_Trabajo']).then(function (translations)
      {
        $scope.loc.AniadirFichaje = translations.loc_AniadirFichaje;
        $scope.loc.Guardar = translations.loc_Guardar;
        $scope.loc.Trabajo = translations.loc_Trabajo;
      });

      // Cabecera
      $translate(['loc_Fecha', 'loc_Tipo', 'loc_Entrada', 'loc_Salida', 'loc_Total', 'loc_Complementarias'])
        .then(function (translations) {
          $scope.theadCols = [translations.loc_Fecha, translations.loc_Tipo, translations.loc_Entrada, translations.loc_Salida
            , translations.loc_Total, translations.loc_Complementarias];
        });

      $scope.completeObj = function ($event)
      {
        $scope.crud.addObjToData('desde', $filter('date')($scope.sel.fechas.desde, 'dd-MM-yyyy'));
        $scope.crud.addObjToData('hasta', $filter('date')($scope.sel.fechas.hasta, 'dd-MM-yyyy'));

        var ruta = ($event) ? $event.currentTarget.attributes.name.nodeValue : null;

        if(ruta)
          $scope.sel.selecType = ruta;

        // Show loading spinner.
        // $scope.gl.loading = true;

        var response = $scope.crud.execute('complete','vendedor', $scope.gl.modulo, $scope.gl.vendedor, ruta);
        response.success(function(data, status, headers, config)
        {
          $scope.gl.vendedor = data.vendedor;
          $scope.initData();

          if($scope.gl.vendedor)
            $scope.staff.reloadFichajes();

          // // Desbloqueamos vista
          // $timeout(function () {
          //     $scope.gl.loading = false;
          // })
        });
      };
      $scope.changeEntrada = function (index, value)
      {
        // alert(index);
      };
      $scope.resetDetalle = function ()
      {
        $scope.detalleDia = false;
        $scope.filtroDetalle = {};
      };
      $scope.isTabActive = function (index)
      {
        return $scope.currentTab == parseInt(index);
      };
      $scope.initData = function ()
      {
        $scope.filtroJornada = {};

        if($scope.gl.vendedor)
        {
          var data = [];

          $scope.staff.reloadFichajes($scope.gl.vendedor);

          for(var x in $scope.gl.vendedor.jornadas)
          {
            for(var y in $scope.gl.vendedor.jornadas[x].fichajes)
            {
              data.push($scope.gl.vendedor.jornadas[x].fichajes[y]);
            }
          }

          $scope.data = data;
        }
      };
      $scope.initData();

      $scope.printFichajeTotal = function (fic)
      {
        var html = '';

        if(fic)
        {
          if(fic.totalHoras > 0)
            html += fic.totalHoras.toString() + ' h';
          if(fic.totalMinutos > 0)
            html += ' ' + fic.totalMinutos + ' min';
        }

        return html;
      };

      $scope.changeFichaje = function (fic)
      {
        if(fic)
        {
          var push = true;

          $scope.calculateNewTotal(fic);
          $scope.calculateNewComplementarias(fic);

          if(!$scope.gl.vendedor.toSaveFichajes)
            $scope.gl.vendedor.toSaveFichajes = [];

          for(var x in $scope.gl.vendedor.toSaveFichajes)
          {
            if($scope.gl.vendedor.toSaveFichajes[x].$$hashKey == fic.$$hashKey)
            {
              push = false;
              break;
            }
          }
          if(push)
            $scope.gl.vendedor.toSaveFichajes.push(fic);
        }
      };

      $scope.calculateNewTotal = function (fic)
      {
        if(fic.jsEntrada && fic.jsSalida && (fic.jsSalida.getHours()*60+fic.jsSalida.getMinutes()) > (fic.jsEntrada.getHours()*60+fic.jsEntrada.getMinutes()))
        {
          fic.totalHoras = fic.jsSalida.getHours() - fic.jsEntrada.getHours();
          fic.totalMinutos = fic.jsSalida.getMinutes() - fic.jsEntrada.getMinutes();

          if(fic.totalMinutos < 0)
          {
            fic.totalHoras -= 1;
            fic.totalMinutos = fic.totalMinutos + 60
          }

          fic.totalStr = $scope.printFichajeTotal(fic);
        }
        else
        {
          fic.totalStr = '';
        }

      };

      $scope.calculateNewComplementarias = function (fic)
      {
        if(fic.horarios && fic.horarios.length > 0)
        {
          var esperado = 0;
          var trabajado = 0;
          var complementarias = 0;
          var html = '';

          for(var x in fic.horarios)
          {
            esperado += (fic.horarios[x].totalHoras * 60) + fic.horarios[x].totalMinutos;
          }

          trabajado += (fic.totalHoras * 60) + fic.totalMinutos;

          if(trabajado > esperado)
          {
            complementarias = trabajado-esperado;

            var ent = Math.floor(complementarias/60);
            var dec = complementarias%60

            if(ent > 0)
              html += ent + ' h';
            if(dec > 0)
              html += ' ' + dec + ' min';

            fic.compStr = html;
          }
        }
        else
        {
          fic.compStr = '';
        }

      };

      $scope.saveNewFichaje = function (fic)
      {
        if(fic)
        {
          var dateStr = '';
          var d = new Date();
          d.setTime(fic.fecha);

          fic.fecha = d;

          dateStr += fic.fecha.getFullYear()+'-';
          dateStr += fic.fecha.getMonth()+1+'-';
          dateStr += fic.fecha.getDate();
        }

        fic.fechaStr = dateStr;

        staffService.saveFichaje(fic, $scope.gl.vendedor, $scope.toggles);
      };

      $scope.confirmDeleteFichaje = function (ev, obj)
      {
        $scope.currentObj = obj;

        var func = function () {
          staffService.deleteFichaje($scope.currentObj, $scope.toggles);
        };

        $translate(['loc_ConfirmarBorrarFichaje', 'loc_Borrar', 'loc_Cancelar']).then(function (translations)
        {
          var msgs = [translations.loc_ConfirmarBorrarFichaje, translations.loc_Borrar, translations.loc_Cancelar];

          $scope.gl.scopes.footer.funcWaiting = func;
          $scope.gl.showMessage(Mensaje.types.normal, msgs[0], $scope.gl.actualView);
        });
      };

      $scope.extractFichajeFromData = function (oldFic, newJornada)
      {
        var fichajes = null;
        // Tenemos que encontrar este mismo fichaje que llega como parámetro dentro de los fichajes de la jornada a que corresponde la fecha del fichaje del vendedor
        if(oldFic && oldFic.fechaStr && $scope.gl.vendedor.jornadas[oldFic.fechaStr])
          fichajes = $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes;

        var deleteFic = function(x)
        {
          delete $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes[x];
          uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents', oldFic.fechaStr);

          var event = $scope.gl.scopes.calendarios.buildJornadaEvent(newJornada);

          uiCalendarConfig.calendars.calendar3.fullCalendar('renderEvent', event);
        };

        for(var x in fichajes)
        {
          var fic = $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes[x];

          if(fic.entrada && fic.entrada.MMFch_id == fic.entrada.MMFch_id)
            deleteFic(x);
          else if(fic.salida && fic.salida.MMFch_id == fic.salida.MMFch_id)
            deleteFic(x);
        }
      };

      $scope.$watch('data', function ()
      {
        $scope.sel.configPages($scope);
      });

      $scope.$watch('gl.vendedor', function ()
      {
        $scope.initData();
      });

      /////////////////////////////// TOGGLES ////////////////////////////////////
      // Cada vez que se borra un fichaje
      $scope.$watch('toggles.delFichaje', function ()
      {
        if($scope.currentObj && $scope.gl.vendedor)
        {
          $scope.extractFichajeFromData($scope.currentObj, $scope.gl.vendedor.jornadas[$scope.currentObj.fechaStr]);
          $scope.gl.scopes.calendarios.showFichajesDialog();
        }
      });
      // Cada vez que se crea un fichaje nuevo
      $scope.$watch('toggles.newFichaje', function ()
      {
        if($scope.gl.vendedor)
        {
          $scope.newFichaje = false;
          $scope.completeObj();
          $scope.initData();
          $scope.gl.scopes.calendarios.showFichajesDialog();
        }
      });
    }]);

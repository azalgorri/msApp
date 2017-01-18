'use strict';

/**
 * @ngdoc service
 * @name msAppApp.staffControl
 * @description
 * # staffControl
 * Service in the msAppApp.
 */
angular.module('msAppApp')
  .service('staffService', ["$filter", "$translate", "$timeout", "glService", "crudService", "selecService", "formatService",
    function ($filter, $translate, $timeout, glService, crudService, selecService, formatService)
    {
      var staff = this;

      this.completeVendedor = function (event)
      {
        crudService.addObjToData('desde', $filter('date')(selecService.fechas.desde, 'dd-MM-yyyy'));
        crudService.addObjToData('hasta', $filter('date')(selecService.fechas.hasta, 'dd-MM-yyyy'));

        var ruta = (event) ? event.currentTarget.attributes.name.nodeValue : null;

        if(ruta)
          selecService.selecType = ruta;

        // Show loading spinner.
        glService.loading = true;

        var response = crudService.execute('complete','vendedor', glService.modulo, glService.vendedor, ruta);
        response.success(function(data, status, headers, config)
        {
          glService.vendedor = data.vendedor;
          if(glService.vendedor && glService.scopes.fichajes)
          {
            glService.scopes.fichajes.data = glService.vendedor.fichajes;
          }

          if(glService.vendedor)
            staff.reloadFichajes();

          // // Desbloqueamos vista
          $timeout(function () {
            glService.loading = false;
          })
        });
      };

      this.reloadFichajes = function (ven)
      {
        var vendedor = ven ? ven : glService.vendedor;

        for(var x in vendedor.jornadas)
        {
          for(var y in vendedor.jornadas[x].fichajes)
          {
            if(vendedor.jornadas[x].fichajes[y].entrada)
            {
              var d = new Date(vendedor.jornadas[x].fichajes[y].entrada.MMFch_fichaje);
              d.setSeconds(0);
              vendedor.jornadas[x].fichajes[y].jsEntrada = d;
            }
            else
              vendedor.jornadas[x].fichajes[y].jsEntrada = "";

            if(vendedor.jornadas[x].fichajes[y].salida)
            {
              var d = new Date(vendedor.jornadas[x].fichajes[y].salida.MMFch_fichaje);
              d.setSeconds(0);
              vendedor.jornadas[x].fichajes[y].jsSalida = d;
            }
            else
              vendedor.jornadas[x].fichajes[y].jsSalida = "";
          }
        }
      };

      this.reloadVacaciones = function (ven)
      {
        var vendedor = ven ? ven : glService.vendedor;

        vendedor.vacaciones.totalDias = [];

        for(var x in vendedor.vacaciones)
        {
          if(vendedor.vacaciones[x].start && vendedor.vacaciones[x].end)
          {
            var auxDate = moment(vendedor.vacaciones[x].start);
            var auxStart = moment(vendedor.vacaciones[x].start);
            var auxEnd = moment(vendedor.vacaciones[x].end);

            while(auxStart.isBefore(auxEnd))
            {
              vendedor.vacaciones.totalDias.push(moment(auxStart));
              auxStart.add(1, 'days');
            }

            vendedor.vacaciones.totalDias.push(moment(auxEnd));
          }
        }
      };

      this.saveFichajes = function ()
      {
        var res = crudService.execute('update','fichajes', glService.modulo, glService.vendedor);

        res.success(function(data, status, headers, config)
        {
          var data = data;

          // glService.vendedor = data.vendedor;

          $translate(['loc_FichajesActualizados', 'loc_FichajesErrorActualizar']).then(function (translations)
          {
            var msgs = [translations.loc_FichajesActualizados, translations.loc_FichajesErrorActualizar];

            if(data.operation)
            {
              glService.scopes.fichajes.completeObj();
              glService.scopes.fichajes.initData();
              glService.scopes.fichajes.recalculateFichajes(glService.vendedor);
              glService.alert(data.operation, msgs[0], msgs[1]);
            }
          });
        })
      };

      this.saveFichaje = function (fichaje, vendedor, toggles)
      {
        // Hay que controlar que el día de los fichajes a añadir esté dentro de los días de los horarios
        if(fichaje != '' && vendedor.jornadas[fichaje.fechaStr])
        {
          crudService.addObjToData('vendedor', vendedor);

          var res = crudService.execute('create','fichaje', glService.modulo, fichaje);

          res.success(function(data, status, headers, config)
          {
            glService.vendedor =  data.vendedor;
            var operation = data.operation;

            $translate(['loc_FichajeGuardado', 'loc_FichajeErrorGuardar']).then(function (translations)
            {
              var msgs = [translations.loc_FichajeGuardado, translations.loc_FichajeErrorGuardar];

              toggles.newFichaje += 1;
              // if(operation)
              //     glService.showMessage(Mensaje.types.success, msgs[0], glService.ventanas.auxiliar.fichajes);
              // else
              //     glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
            });
          })
        }
        else
        {
          $translate(['loc_FichajeGuardado', 'loc_FichajeFueraDeHorario']).then(function (translations)
          {
            var msgs = [translations.loc_FichajeGuardado, translations.loc_FichajeFueraDeHorario];

            glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
          });
        }
      };

      this.deleteFichaje = function (fichaje, toggles)
      {
        crudService.addObjToData('desde', $filter('date')(selecService.fechas.desde, 'dd-MM-yyyy'));
        crudService.addObjToData('hasta', $filter('date')(selecService.fechas.hasta, 'dd-MM-yyyy'));

        var res = crudService.execute('delete','fichaje', glService.modulo, fichaje);

        res.success(function(data, status, headers, config)
        {
          glService.vendedor = data.vendedor;
          var operation = data.operation;

          $translate(['loc_FichajeEliminado', 'loc_FichajeErrorBorrar']).then(function (translations)
          {
            var msgs = [translations.loc_FichajeEliminado, translations.loc_FichajeErrorBorrar];

            if(operation)
            {
              toggles.delFichaje += 1;
              // glService.showMessage(Mensaje.types.success, msgs[0], glService.ventanas.auxiliar.fichajes);
            }
            // else
            // glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
          });
        })
      }
  }]);

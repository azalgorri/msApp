'use strict';

/**
 * @ngdoc service
 * @name msAppApp.selecService
 * @description
 * # selecService
 * Service in the msAppApp.
 */
angular.module('msAppApp')
  .service('selecService', function ()
  {
    this.entity = '';
    this.selectType = '';
    this.theadCols = [];
    this.tbodyRows = [];
    this.selectedIndex = null;
    this.rowIndex = -1;
    this.selectedObj = null;
    this.fechas = {
      desde: new Date(),
      hasta: new Date(),
      newOne: new Date()
    };
    this.selectedTr = null;
    this.foto = false;
    this.paginacion = false;
    this.codigoEntity = '';

    this.selectRow = function (index, e)
    {
      this.selectedObj = this.filteredData[index];
      this.selectedTr = angular.element(e.target).parent();
      this.rowIndex = index;
    };
    this.selectFirst = function ()
    {
      // Seleccionamos el primer elemento de la lista
      if(typeof document.querySelectorAll('tbody tr')[0] != 'undefined')
        document.querySelectorAll('tbody tr')[0].click();
    };
    this.doSelection = function (scope)
    {
      switch (scope.gl.modulo)
      {
        case 'client-dashboard':
          switch (scope.sel.entity)
          {
            case 'cliente':
              scope.gl.cliSelected = scope.sel.selectedObj;
              this.codigoEntity = scope.gl.cliSelected.codigo;
              var res = scope.crud.execute('find','clientes', scope.gl.modulo, scope.gl.cliSelected);

              res.success(function(data, status, headers, config)
              {
                var viewModels = data;
                scope.gl.cliSelected = viewModels.cliente;
              });
              break;

            case 'estado':
              scope.gl.cliSelected.estado = scope.sel.selectedObj;
              this.codigoEntity = scope.gl.cliSelected.estado.codigo;
              scope.gl.cliSelected.provincia = undefined;
              break;

            case 'provincia':
              scope.gl.cliSelected.provincia = scope.sel.selectedObj;
              this.codigoEntity = scope.gl.cliSelected.provincia.codigo;
              break;
          }

          switch (scope.gl.submodulo)
          {
            case scope.gl.submodulos.conModCliente:
            case scope.gl.submodulos.altaCliente:
              scope.gl.changeView(scope.gl.ventanas.formulario);
              break;

            case 'ventas-cliente':
              scope.gl.changeView(scope.gl.ventanas.principal);
              break;
          }
          break;

        case 'staff-control':
          switch (scope.sel.entity)
          {
            case 'estado':
              scope.gl.vendedor.estado = scope.sel.selectedObj;
              this.codigoEntity = scope.gl.vendedor.estado.codigo;
              scope.gl.vendedor.provincia = undefined;
              break;

            case 'provincia':
              scope.gl.vendedor.provincia = scope.sel.selectedObj;
              this.codigoEntity = scope.gl.vendedor.provincia.codigo;
              break;
          }
          switch (scope.gl.submodulo)
          {
            case scope.gl.submodulos.modifVendedor:
              scope.gl.changeView(scope.gl.ventanas.formulario);
              break;
          }
          break;
      }

    };

    this.configPages = function (scope)
    {
      var d = null;

      if(typeof total != 'undefined')
        d=total;
      else
      {
        if(scope.dData)
          d=scope.dData;
        else
          d=scope.data;
      }

      scope.pages.length = 0;
      var ini = scope.currentPage - 4;
      var fin = scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil(d.length / scope.pageSize) > 10) fin = 10;
        else fin = Math.ceil(d.length / scope.pageSize);
      } else {
        if (ini >= Math.ceil(d.length / scope.pageSize) - 10) {
          ini = Math.ceil(d.length / scope.pageSize) - 10;
          fin = Math.ceil(d.length / scope.pageSize);
        }
      }
      if (ini < 1) ini = 1;
      for (var i = ini; i <= fin; i++) {
        scope.pages.push({ no: i });
      }
      // if (scope.currentPage >= scope.pages.length)
      //     scope.currentPage = scope.pages.length - 1;
    };
  });

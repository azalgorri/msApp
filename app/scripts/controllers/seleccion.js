'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:SeleccionCtrl
 * @description
 * # SeleccionCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('seleccionCtrl', [ '$scope', '$http', '$timeout', '$translate', 'glService', 'selecService', 'crudService',
    function ($scope, $http, $timeout, $translate, glService, selecService, crudService)
    {
      $scope.gl = glService;
      $scope.sel = selecService;
      $scope.crud = crudService;

      $scope.sel.foto = false;
      $scope.color = '#00FF00';

      $scope.buscarEstados = function (filtro)
      {
        $scope.sel.entity = 'estado';
        $scope.sel.selectType = 'estadoProvincia';

        if(filtro == undefined)
          filtro = '';

        estadoProvinciaTranslations();

        var res = $scope.crud.execute('read','estados',$scope.gl.modulo, filtro);

        res.success(function(data, status, headers, config)
        {
          var viewModels = data;

          $scope.sel.tbodyRows = viewModels.commons.estados;

          // Cambio de ventana
          $scope.gl.changeView(3);
          startSelection();
        });
      };

      $scope.buscarPovincias = function (filtro)
      {
        $scope.sel.entity = 'provincia';
        $scope.sel.selectType = 'estadoProvincia';

        if(filtro == undefined)
          filtro = '';

        estadoProvinciaTranslations();

        // var viewModels = searchProvincias_ajax($scope.gl.modulo, filtro);
        var res = $scope.crud.execute('read','provincias', $scope.gl.modulo,filtro);

        res.success(function(data, status, headers, config)
        {
          var viewModels = data;

          $scope.sel.tbodyRows = viewModels.commons.provincias;

          // Cambio de ventana
          $scope.gl.changeView(3);
          startSelection();
        });
      };

      $scope.filter = function (e)
      {
        var name = angular.element(e.target).attr('name');
        var input = angular.element(e.target).val();

        switch (name)
        {
          case 'estadoInput':
            $scope.buscarEstados(input);
            break;

          case 'provinciaInput':
            $scope.buscarPovincias(input);
            break;
        }
      };

      $scope.buscarClientes = function (filtro)
      {
        $scope.sel.entity = 'cliente';
        $scope.sel.selectType = 'cliente';
        $scope.sel.paginacion = true;

        if(filtro == undefined)
          filtro = '';

        $translate(['loc_Codigo', 'loc_Nombre', 'loc_Apellidos']).then(function (translations) {
          $scope.sel.theadCols = [translations.loc_Codigo, translations.loc_Nombre, translations.loc_Apellidos];
        });

        $scope.gl.changeView(3);
        startSelection();
      };

      function estadoProvinciaTranslations (filtro)
      {
        $translate(['loc_Codigo', 'loc_Nombre']).then(function (translations) {
          $scope.sel.theadCols = [translations.loc_Codigo, translations.loc_Nombre];
        });
      }

      function startSelection()
      {
        $timeout(function () {
          $scope.sel.selectFirst();
        }, 100)
      }
    }]);

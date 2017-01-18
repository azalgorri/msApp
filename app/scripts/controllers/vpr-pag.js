'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:VprPagCtrl
 * @description
 * # VprPagCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('vprPagCtrl', [ '$scope', '$http','$filter', '$translate', 'glService', 'crudService', 'selecService',
    function ($scope, $http, $filter, $translate, glService, crudService, selecService)
    {
      $scope.gl = glService;
      $scope.crud = crudService;
      $scope.sel = selecService;

      // Global
      $scope.gl.scopes.vpr = $scope;

      $scope.currentPage = 0;
      $scope.pageSize = $scope.gl.calculateBySize(5); // Esta la cantidad de registros que deseamos mostrar por p?gina
      $scope.pages = [];
      $scope.filteredData = [];
      $scope.data = [];
      $scope.articulo = null;
      $scope.totalValor = 0;
      $scope.totalUnidades = 0;
      $scope.tipoTabla = 0;
      $scope.tipos = {
        ventasPrestamos: 0,
        reservas: 1
      };
      $scope.fotoIndex = 0;

      $scope.showArticulo = function (artId)
      {
        var response = $scope.crud.execute('read','articulo', $scope.gl.modulo, artId);
        response.success(function(data, status, headers, config)
        {
          $scope.articulo = data.articulo;
          $scope.gl.showModal1 = true;
        });
      };
      $scope.showArticuloDialog = function (artId)
      {
        var response = $scope.crud.execute('read','articulo', $scope.gl.modulo, artId);
        response.success(function(data, status, headers, config)
        {
          $scope.articulo = data.articulo;
          $scope.gl.changeView($scope.gl.ventanas.auxiliar.articulo, $scope.gl.ventanas.vpr);
        });
      };

      $scope.$watch('tipoTabla', function ()
      {
        switch ($scope.tipoTabla)
        {
          case $scope.tipos.ventasPrestamos:
            // Cabecera
            $translate(['loc_Fecha', 'loc_Vendedor', 'loc_Articulo', 'loc_Talla', 'loc_Unidades', 'loc_Precio', 'loc_Descuento', 'loc_Valor']).then(function (translations) {
              $scope.theadCols = [translations.loc_Fecha, translations.loc_Vendedor, translations.loc_Articulo, translations.loc_Talla,
                translations.loc_Unidades, translations.loc_Precio, translations.loc_Descuento, translations.loc_Valor];
            });
            break;

          case $scope.tipos.reservas:
            // Cabecera
            $translate(['loc_Fecha', 'loc_Vendedor', 'loc_Articulo', 'loc_Talla', 'loc_Unidades', 'loc_Precio', 'loc_Destino', 'loc_Tipo', 'loc_Estado']).then(function (translations) {
              $scope.theadCols = [translations.loc_Fecha, translations.loc_Vendedor, translations.loc_Articulo, translations.loc_Talla,
                translations.loc_Unidades, translations.loc_Precio, translations.loc_Destino, translations.loc_Tipo, translations.loc_Estado];
            });
            break;
        }

      });

      $scope.$watch('data', function ()
      {
        $scope.sel.configPages($scope);
      });
      //-----------------------------------//
    }]);

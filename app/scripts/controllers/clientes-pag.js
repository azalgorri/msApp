'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:ClientesPagCtrl
 * @description
 * # ClientesPagCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('clientesPagCtrl', [ '$scope', '$http','$filter', '$timeout', 'glService', 'crudService', 'formatService', 'selecService',
    function ($scope, $http, $filter, $timeout, glService, crudService, formatService, selecService)
    {
      $scope.gl = glService;
      $scope.crud = crudService;
      $scope.format = formatService;
      $scope.sel = selecService;

      // Servicio global
      $scope.gl.loading = false;
      $scope.gl.scopes.clientes = $scope;

      $scope.currentPage = 0;
      $scope.pageSize = 20; // Esta la cantidad de registros que deseamos mostrar por p?gina
      $scope.pages = [];
      $scope.filteredData = [];
      $scope.dData = [];
      $scope.filters = {};
      $scope.searchInput = null;
      $scope.sel.selectedIndex = -1;

      $scope.letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      $scope.startingLetter = false;
      $scope.data = [];

      $scope.toggles = {
        delCliente: 0,
        modCliente: 0,
        newCliente: 0
      };

      var viewModels = [];

      // Show loading spinner.
      $scope.gl.loading = true;

      var res = $scope.crud.execute('read','clientes',$scope.gl.modulo);

      res.success(function(data, status, headers, config)
      {
        $scope.gl.scopes.clientes.usrDatas = data.usrDatas;
        viewModels = data;
        for(var x in viewModels.clientes)
        {
          $scope.data = $scope.data.concat(viewModels.clientes[x]);
        }
        $scope.gl.vendedor = viewModels.vendedor;

        // Desbloqueamos vista
        $timeout(function () {
          $scope.gl.loading = false;
          document.getElementById("curtain").style.display = 'block';
          document.getElementById('clienteInput').focus();
          $scope.gl.changeView(1);
        });
      });

      //----------- ACCIONES CLIENTE -----------------//
      $scope.focusMe = function(element)
      {
        document.getElementById(element).focus();
      };
      $scope.searchClient = function(input)
      {
        $scope.startingLetter = undefined;

        if($scope.searchInput != null)
        {
          switch ($scope.criterio)
          {
            case "tarjeta":
              $scope.filters = { tarjeta: $scope.searchInput};
              break;

            case "codigo":
              $scope.filters = { codigo: $scope.searchInput};
              break;

            case "nombre":
              $scope.filters = { nombre: $scope.searchInput};
              break;

            case "dni":
              $scope.filters = { dni: $scope.searchInput};
              break;

            case "email":
              $scope.filters = { email: $scope.searchInput};
              break;

            case "poblacion":
              $scope.filters = { poblacion: $scope.searchInput};
              break;
          }
        }
      };
      $scope.searchClientByLetter = function (letra)
      {
        $scope.startingLetter = letra;
      };
      $scope.selectCliente = function (index)
      {
        $scope.sel.rowIndex = index;
        $scope.sel.selectedIndex = index;
        $scope.gl.cliSelected =  $scope.format.formatClientData($scope.filteredData[index]);
        $scope.gl.submodulo = $scope.gl.submodulos.conModCliente;

        if($scope.sel.selectType != 'cliente')
          $scope.gl.changeView($scope.gl.ventanas.formulario);
      };
      $scope.nuevoCliente = function ()
      {
        $scope.resetClienteForm();
        $scope.gl.submodulo = $scope.gl.submodulos.altaCliente;
        $scope.gl.changeView($scope.gl.ventanas.formulario);
      };

      $scope.resetClienteForm = function ()
      {
        var uds = [];

        // Copiamos los usrDatas de cualquiera de los clientes borrando su contenido. Nos interesan los labels
        if($scope.data[0] && $scope.data[0].usrDatas)
        {
          for(var x in $scope.data[0].usrDatas)
          {
            var newUd = {
              label: $scope.data[0].usrDatas[x].label,
              value: ''
            };
            uds.push(newUd);
          }
        }

        $scope.gl.cliSelected = {
          blank: true,
          usrDatas: uds
        };

        $scope.gl.resetFormValidation($scope.gl.newCliente_form);
      };

      $scope.$watch('data', function ()
      {
        $scope.sel.configPages($scope);
      });

      $scope.$watchGroup(['toggles.delCliente', 'toggles.modCliente', 'toggles.newCliente'], function ()
      {
        $scope.resetClienteForm();
      });
    }]);

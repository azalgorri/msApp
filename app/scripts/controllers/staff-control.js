'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:StaffControlCtrl
 * @description
 * # StaffControlCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('staffControlCtrl', ["$scope", "glService", function ($scope, glService) {

    $scope.gl = glService;

    glService.actualView = glService.ventanas.auxiliar.fichajes;
    glService.mensaje = {text : 'Hola'}

  }]);

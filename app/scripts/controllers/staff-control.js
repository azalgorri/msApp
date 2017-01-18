'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:StaffControlCtrl
 * @description
 * # StaffControlCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('staffControlCtrl', ["glService", function (glService) {

    $scope.gl = glService;
    
    glService.actualView = glService.ventanas.auxiliar.fichajes;
    
  }]);

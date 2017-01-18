'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:DatePickerCtrl
 * @description
 * # DatePickerCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('datePickerCtrl', ['$scope', '$filter', 'selecService', 'glService',
    function ($scope, $filter, selecService, glService)
    {
      $scope.sel = selecService;
      $scope.gl = glService;

      $scope.today = new Date();

      $scope.desde = function () {
        // $scope.dtDesde = new Date().setMonth($scope.today.getMonth() - 3);
        var desde = new Date();
        desde.setMonth($scope.today.getMonth() - 3);
        $scope.sel.fechas.desde = desde;
        // $scope.sel.fechas.desde = new Date().setMonth($scope.today.getMonth() - 3);
        // var d = $filter('date')($scope.dtDesde, 'dd-MM-yyyy');
      };
      $scope.desde();

      $scope.hasta = function() {
        // $scope.dtHasta = $scope.today;
        $scope.sel.fechas.hasta = $scope.today;
      };
      $scope.hasta();

      $scope.clear = function() {
        // $scope.dtDesde = null;
        // $scope.dtHasta = null;
        $scope.sel.fechas.desde = null;
        $scope.sel.fechas.hasta = null;
      };

      $scope.inlineOptions = {
        customClass: getDayClass,
        showWeeks: true
      };

      $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yyyy',
        minDate: $scope.minDate,
        maxDate: $scope.maxDate,
        startingDay: 1,
        showWeeks: false
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function() {
        // $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        // $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };

      $scope.toggleMin();

      $scope.open1 = function()
      {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function()
      {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.sel.fechas.desde = new Date(year, month, day);
        $scope.sel.fechas.hasta = new Date(year, month, day);
      };

      $scope.formats = ['dd-MM-yyyy', 'dd-MMMM-yyyy','yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
    }]);

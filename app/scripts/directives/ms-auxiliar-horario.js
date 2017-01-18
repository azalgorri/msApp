'use strict';

/**
 * @ngdoc directive
 * @name msAppApp.directive:msAuxiliarHorario
 * @description
 * # msAuxiliarHorario
 */
angular.module('msAppApp')
  .directive('msAuxiliarHorario',['$timeout', 'formatService', 'staffService',
    function($timeout, formatService, staffService)
    {
      var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'scripts/directives/ms-auxiliar-horario.html',
        scope: {
          model: "=",
          datePickerModel: "="
        },
        link: function (scope, iElement, iAttrs, controller, transcludeFn)
        {
          scope.myArrayOfDates = [];
          scope.myDates = [];
          scope.lastDate = '';
          scope.toggleDays = {
            lun: true,
            mar: true,
            mie: true,
            juv: true,
            vie: true,
            sab: false,
            dom: false
          };
          scope.highlightDays = [];

          scope.dayClick = function(event, moment)
          {
            scope.lastDate = formatService.dateToString(moment.date.toDate(), 'dd-MM-yyyy');
            scope.myArrayOfDates.push(moment);
            scope.myDates.push(scope.lastDate);
          };

          scope.resetDays = function ()
          {
            scope.myArrayOfDates = [];
            scope.myDates = [];
          };

          scope.todosDias = function()
          {
            var month = scope.$$childTail.month._d.getMonth();
            var todos = scope.$$childTail.days;
            scope.myArrayOfDates = [];

            for(var x in todos)
            {
              if(todos[x].date._d.getMonth() == month)
              {
                var go = false;

                if (scope.toggleDays.lun && todos[x].date._d.getDay()==1)
                  go = !go;
                else if (scope.toggleDays.mar && todos[x].date._d.getDay()==2)
                  go = !go;
                else if (scope.toggleDays.mie && todos[x].date._d.getDay()==3)
                  go = !go;
                else if (scope.toggleDays.juv && todos[x].date._d.getDay()==4)
                  go = !go;
                else if (scope.toggleDays.vie && todos[x].date._d.getDay()==5)
                  go = !go;
                else if (scope.toggleDays.sab && todos[x].date._d.getDay()==6)
                  go = !go;
                else if (scope.toggleDays.dom && todos[x].date._d.getDay()==0)
                  go = !go;

                if(go)
                  scope.myArrayOfDates.push(todos[x].date);
              }
            }
          };

          $timeout(function () {
            document.querySelector('#horarioEdition_box > div > div > multiple-date-picker > div > div.picker-days-week-row > div:nth-child(6)').innerText = "sá"
          });

          scope.$watch('model.vendedor', function () {
            if(scope.model.vendedor)
            {
              staffService.reloadVacaciones();
              loadVacaciones(scope.model.vendedor.vacaciones.totalDias, scope.highlightDays);
              loadHorarios(scope.model.vendedor.horarios, scope.myArrayOfDates)
            }
          });

          var loadVacaciones = function (vacaciones, array)
          {
            for(var x in vacaciones)
            {
              var vac = {
                date: vacaciones[x],
                css: 'div_vacaciones',
                selectable: false,
                title: 'Vacaciones'
              };

              array.push(vac);
            }
          };

          var loadHorarios = function (horarios, array)
          {
            for(var x in horarios)
            {
              var hor = {
                date: moment(horarios[x].fecha),
                css: 'div_horarios',
                selectable: true,
                title: 'Día de trabajo'
              };

              array.push(moment(horarios[x].fecha));
            }
          }
        }
      };

      return directiveDefinitionObject;
  }]);

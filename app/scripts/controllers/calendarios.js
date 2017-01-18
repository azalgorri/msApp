'use strict';

/**
 * @ngdoc function
 * @name msAppApp.controller:CalendariosCtrl
 * @description
 * # CalendariosCtrl
 * Controller of the msAppApp
 */
angular.module('msAppApp')
  .controller('calendariosCtrl', [ '$scope', '$timeout', '$rootScope','$translate', 'glService', 'selecService', 'staffService', 'uiCalendarConfig',
    function ($scope, $timeout, $rootScope, $translate, glService, selecService, staffService, uiCalendarConfig)
    {
      /* event sources array*/
      $scope.calendars = {
        horarios: 1,
        vacaciones: 2,
        fichajes: 3
      };
      $scope.calendar = $scope.calendars.horarios;
      $scope.eventSources1 = [];
      $scope.eventSources2 = [];
      $scope.eventSources3 = [];
      $scope.hoyTxt = 'Hoy';
      $scope.currentTab = 0;

      $scope.gl = glService;
      $scope.gl.scopes.calendarios = $scope;

      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
      var currentView = "week";

      $scope.recalculateFichajes = function (ven)
      {
        uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents');
        $scope.addEvent( $scope.gl.scopes.calendarios.calendars.fichajes, ven);
      };

      $scope.changeCalendar = function (cal)
      {
        $scope.calendar = cal;

        $timeout(function () {
          $('div.fc-toolbar > div.fc-right > button').click();
        })
      };

      $scope.buildJornadaEvent = function (jor)
      {
        return {
          id: jor.fecha.substr(0,10),
          trabajado: {
            horas: Math.floor(jor.totalMinTrabajado/60),
            minutos: jor.totalMinTrabajado%60
          },
          esperado: {
            horas: Math.floor(jor.totalMinEsperado/60),
            minutos: jor.totalMinEsperado%60
          },
          start: jor.fecha,
          end: jor.fecha,
          allDay: false,
          className: ['horasTrabajoReales'],
          backgroundColor: 'transparent',
          textEscape: true,
          errores: false
        }
      };

      $scope.loadCalendarFichajes = function (vendedor)
      {
        if(uiCalendarConfig.calendars.calendar3)
        {
          uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents');
        }

        // Calendar3
        $timeout(function ()
        {
          if(vendedor && vendedor.jornadas)
          {
            var dateActual = null;
            var jornadas = vendedor.jornadas;
            var events = [];
            var id = '';

            for(var x in jornadas)
            {
              events.push($scope.buildJornadaEvent(jornadas[x]));

              id = '';
            }
          }

          if(uiCalendarConfig.calendars.calendar3)
          {
            uiCalendarConfig.calendars.calendar3.fullCalendar('addEventSource', events);
          }
        });
      };

      $scope.addEvent = function (cal, vendedor)
      {
        var source = [];

        if(vendedor)
        {
          switch (cal)
          {
            case $scope.calendars.horarios:

              if(vendedor.horarios)
              {
                var events = [];

                for(var y in vendedor.horarios)
                {
                  var d1 = new Date(vendedor.horarios[y].start);
                  var d2 = new Date(vendedor.horarios[y].end);

                  events.push({
                    id: vendedor.id,
                    start: d1,
                    end: d2,
                    className: ['horasTrabajoTeoricas'],
                    backgroundColor: (vendedor.color) ? '#'+vendedor.color : '#C3C3C3'
                  })
                }

                if(uiCalendarConfig.calendars.calendar1)
                  uiCalendarConfig.calendars.calendar1.fullCalendar('addEventSource', events);
              }
              break;

            case $scope.calendars.vacaciones:

              if(vendedor.vacaciones)
              {
                var events = [];

                for(var y in vendedor.vacaciones)
                {
                  var d1 = new Date(vendedor.vacaciones[y].start);
                  var d2 = new Date(vendedor.vacaciones[y].end);

                  events.push({
                    id: vendedor.id,
                    start: d1,
                    end: d2,
                    className: ['vacaciones'],
                    backgroundColor: (vendedor.color) ? '#'+vendedor.color : '#C3C3C3'
                  })
                }

                if(uiCalendarConfig.calendars.calendar2)
                  uiCalendarConfig.calendars.calendar2.fullCalendar('addEventSource', events);
              }

              break;

            case $scope.calendars.fichajes:

              // $scope.redoCalendarFichajes(vendedor);
              $scope.loadCalendarFichajes(vendedor);

              break;
          }
        }
      };

      $scope.redoCalendarFichajes = function (vendedor)
      {
        $timeout(function ()
        {
          if(vendedor && vendedor.fichajesDias)
          {
            var dateActual = null;
            var ficDias = vendedor.fichajesDias;
            var events = [];

            for(var x in ficDias)
            {
              var horas = 0;
              var minutos = 0;
              var esperadoHoras = 0;
              var esperadoMinutos = 0;
              var errores = false;
              var id = '';

              for (var y in ficDias[x])
              {
                dateActual = ficDias[x][y].fecha;

                var id = '';
                if(ficDias[x][y].entrada)
                  id += ficDias[x][y].entrada.MMFch_fichaje;
                if(ficDias[x][y].salida)
                  id += '/' + ficDias[x][y].salida.MMFch_fichaje;

                // Control de si el fichaje está cerrado, lo que quiere decir que son horas trabajadas
                if(ficDias[x][y].cerrado)
                {
                  horas += ficDias[x][y].totalHoras;
                  minutos += ficDias[x][y].totalMinutos;

                  // Si tenemos mas de 59 minutos
                  if(minutos >= 60)
                  {
                    horas += 1;
                    minutos -= 60;
                  }
                }
                else
                {
                  errores = true;
                }
              }

              // Total de horas esperado para ese día. En este caso nos vale cualquiera de los fichajes del día,
              // pues cada uno tiene asociado un objeto que contiene todos los horarios definidos para ese día.
              // Usaremos la primera posición
              if(ficDias[x][0])
              {
                for(var z in ficDias[x][0].horarios)
                {
                  esperadoHoras += ficDias[x][0].horarios[z].totalHoras;
                  esperadoMinutos += ficDias[x][0].horarios[z].totalMinutos;
                }
              }

              // Horas de trabajo reales
              events.push(
                {
                  id: id,
                  trabajado: {
                    horas: horas,
                    minutos: minutos
                  },
                  esperado: {
                    horas: esperadoHoras,
                    minutos: esperadoMinutos
                  },
                  start: dateActual,
                  end: dateActual,
                  allDay: false,
                  className: ['horasTrabajoReales'],
                  backgroundColor: 'transparent',
                  textEscape: true,
                  errores: errores
                }
              );

              id = '';
            }

            if(uiCalendarConfig.calendars.calendar3)
            {
              uiCalendarConfig.calendars.calendar3.fullCalendar('addEventSource', events);
            }
          }
        })

      };

      $scope.deleteEvent = function (cal, eventId)
      {
        switch (cal)
        {
          case $scope.calendars.horarios:
            if(uiCalendarConfig.calendars.calendar1 && eventId)
              uiCalendarConfig.calendars.calendar1.fullCalendar('removeEvents', eventId);
            break;
          case $scope.calendars.vacaciones:
            if(uiCalendarConfig.calendars.calendar2 && eventId)
              uiCalendarConfig.calendars.calendar2.fullCalendar('removeEvents', eventId);
            break;
          case $scope.calendars.fichajes:
            if(uiCalendarConfig.calendars.calendar3)
            {
              if(eventId)
                uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents', eventId);
              else
                uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents');
            }
            break;
        }
      };

      //with this you can handle the events that generated by clicking the day(empty spot) in the calendar
      $scope.dayClick = function( date, allDay, jsEvent, view ){
        // $scope.$apply(function(){
        //     $scope.alertMessage = ('Day Clicked ' + date);
        // });
      };


      //with this you can handle the events that generated by droping any event to different position in the calendar
      $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
        // $scope.$apply(function(){
        //     $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
        // });
      };


      //with this you can handle the events that generated by resizing any event to different position in the calendar
      $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
        // $scope.$apply(function(){
        //     $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
        // });
      };

      //with this you can handle the click on the events
      $scope.eventClick = function(event)
      {
        // $scope.$apply(function(){
        //     alert(event.title + ' is clicked');
        // });
        // alert(event.title + ' is clicked');
      };

      //with this you can handle the events that generated by each page render process
      $scope.renderView = function(view, calendar){
        // var date = new Date(view.calendar.getDate());
        // $scope.currentDate = date.toDateString();
        // $scope.$apply(function(){
        //     $scope.alertMessage = ('Page render with date '+ $scope.currentDate);
        // });
      };

      //with this you can handle the events that generated when we change the view i.e. Month, Week and Day
      $scope.changeView = function(view,calendar) {
        // currentView = view;
        // calendar.fullCalendar('changeView',view);
        // $scope.$apply(function(){
        //     $scope.alertMessage = ('You are looking at '+ currentView);
        // });
      };

      $scope.getVendedorColor = function (ven)
      {
        var color = '#';

        if(ven)
          color += ven.color;

        return color;
      };


      $scope.clickToday = function ()
      {
        $timeout(function () {
          $('div.fc-toolbar > div.fc-right > button').click();
        }, 100)
      };

      var height = document.getElementById('cuerpo').clientHeight * 0.96;
      $scope.uiConfig = {
        // Calendario horario
        calendar1:{
          defaultView: 'agendaWeek',
          titleFormat: 'MMMM YYYY',
          // columnFormat: 'ddd M/d',
          firstDay: 1,
          allDaySlot: false,
          timeFormat: 'H:mm{-H:mmtt }',
          axisFormat: 'H:mm - H:mm',
          timezone: 'UTC',
          minTime: '07:00:00',
          maxTime: '22:00:00',
          height: height,
          editable: false,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          buttonText: {
            today: $scope.hoyTxt
          },
          // buttonText: {
          //     //Here I make the button show Spanish date instead of a text.
          //     // today: moment().locale("es").format("MMMM YYYY")
          //     today: moment().locale("es")
          // },
          dayClick: $scope.dayClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventClick: $scope.eventClick,
          viewRender: $scope.renderView
        },
        // Calendario vacaciones
        calendar2:{
          titleFormat: 'MMMM YYYY',
          columnFormat: 'dddd',
          firstDay: 1,
          height: height,
          editable: false,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          buttonText: {
            today: $scope.hoyTxt
          },
          dayClick: $scope.dayClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventClick: $scope.eventClick,
          viewRender: $scope.renderView
        },
        // Calendario fichajes
        calendar3:{
          titleFormat: 'MMMM YYYY',
          columnFormat: 'dddd',
          height: height,
          firstDay: 1,
          editable: true,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          buttonText: {
            today: $scope.hoyTxt
          },
          dayClick: $scope.dayClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventClick: $scope.showFichajesPorDiaDialog,
          viewRender: $scope.renderView,
          eventAfterRender: function (event, element)
          {
            var printHorasMin = function (h, m) {
              var html = '';

              if(h > 0)
              {
                html += h+' h ';

                if(m > 0)
                {
                  html += m+' min';
                }
              }

              return html;
            };

            var setTrabajoClass = function (trabajado, esperado) {
              var t = trabajado.horas*60 + trabajado.minutos;
              var e = esperado.horas*60 + esperado.minutos;

              if(t > e)
                return 'tiempoExtra';
              else if(t == e)
                return 'tiempoEsperado';
              else
                return 'tiempoInferior';
            };

            var hasErrors = function (errores) {
              return errores ? ' * ' : '';
            };

            var html = '<div class="customEvent '+setTrabajoClass(event.trabajado, event.esperado)+'">' +
              '<div class="trabajado"><span>'+printHorasMin(event.trabajado.horas, event.trabajado.minutos)+'</span></div>'+
              '<div class="esperado"><span>'+printHorasMin(event.esperado.horas, event.esperado.minutos)+'</span></div>' +
              '<div class="fichajeErrors"><span>' + hasErrors(event.errores) + '</span></div>' +
              '</div>';
            var x = $(element).html(html);
          }
        }
      };

      $scope.$watch('gl.data.vendedores', function ()
      {
        var minHeight = document.getElementById('cuerpo').clientHeight*1.09;

        if(document.getElementById('cuerpo').clientHeight > 600)
          minHeight = document.getElementById('cuerpo').clientHeight*1.02;

        $('#calendario_box md-tabs').css('min-height', minHeight);

        for(var x in $scope.gl.data.vendedores)
        {
          $scope.addEvent($scope.calendars.horarios, $scope.gl.data.vendedores[x]);
          $scope.addEvent($scope.calendars.vacaciones, $scope.gl.data.vendedores[x]);
        }
      });

      $scope.$watchGroup(['uiCalendarConfig.calendars.calendar1', 'uiCalendarConfig.calendars.calendar2', 'uiCalendarConfig.calendars.calendar3'],
        function(newValues, oldValues, scope)
        {
          // div.fc-toolbar > div.fc-right > button
          $timeout(function () {
            $scope.clickToday();
          })
        });
    }
  ]);

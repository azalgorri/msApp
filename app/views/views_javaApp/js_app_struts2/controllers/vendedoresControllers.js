// Controlador principal del módulo staff-control
app.controller('vendedoresCtrl',[ '$scope', '$timeout', '$filter', '$translate', 'glService', 'selecService', 'crudService', '$http', 'staffService', 'uiCalendarConfig',
    function ($scope, $timeout, $filter, $translate, glService, selecService, crudService, $http, staffService, uiCalendarConfig)
    {
        $scope.gl = glService;
        $scope.sel = selecService;
        $scope.crud = crudService;
        $scope.staff = staffService;

        $scope.gl.modulo = 'staff-control';
        $scope.gl.scopes.vendedores = $scope;
        
        $scope.tipoFichaje = [];
        $scope.focusedIndex = -1;
        $scope.gl.submodulos ={
            modifVendedor: 0
        };

        // Show loading spinner.
        $scope.gl.loading = true;

        var res = $scope.crud.execute('read','vendedores', $scope.gl.modulo);

        res.success(function(data, status, headers, config)
        {
            $scope.gl.data.vendedores = data.vendedores;

            // Desbloqueamos vista
            $timeout(function () {
                $scope.gl.loading = false;
                document.getElementById("curtain").style.display = 'block';
                $scope.gl.changeView(1);
            });
        });

        $scope.datePickerModel = 
        {
            desde: new Date(),
        };
        
        // Cabecera de la tabla de entradas y salidas
        $translate(['loc_Fecha', 'loc_Tipo', 'loc_Entrada', 'loc_Salida', 'loc_Total']).then(function (translations) {
            $scope.theadCols = [translations.loc_Fecha, translations.loc_Tipo, translations.loc_Entrada, translations.loc_Salida, translations.loc_Total];
        });
        // Tipo de fichajes
        $translate(['loc_Entrada', 'loc_Salida', 'loc_Pausa']).then(function (translations) {
            $scope.tipoFichaje.push(translations.loc_Entrada);
            $scope.tipoFichaje.push(translations.loc_Salida);
            $scope.tipoFichaje.push(translations.loc_Pausa);
        });

        $scope.selectVendedor = function (index)
        {
            var aux = [];
            var venHTML = $('.vendedorDiv')[index];

            $scope.focusedIndex == index;
            $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.fichajes);
            $scope.gl.vendedor = $scope.gl.data.vendedores[index];
            // $(venHTML).hasClass('focusedVendedor') ? $(venHTML).removeClass('focusedVendedor') : $(venHTML).addClass('focusedVendedor');
            
            $scope.crud.execute('select', 'vendedor', $scope.gl.modulo, $scope.gl.vendedor);
            
            $scope.staff.reloadFichajes($scope.gl.vendedor);
            // $scope.gl.scopes.calendarios.recalculateFichajes($scope.gl.vendedor);
        };
        $scope.isSelected = function (index)
        {
            var ven = $scope.gl.data.vendedores[index];

            for (var x in $scope.gl.vendedoresSeleccionados)
            {
                if($scope.gl.vendedoresSeleccionados[x].id == ven.id)
                    return true;
            }
            return false;
        };
        $scope.isFocused = function (index)
        {
            var res = false;
            
            if($scope.focusedIndex == index)
                res = true;
            
            return res
        };
        $scope.addVendedor = function (index, event)
        {
            var ven = $scope.gl.data.vendedores[index];
            
            if(event.currentTarget.className.includes('selectedVendedor'))
            {
                // Quitar vendedor de los seleccionados
                var x = angular.element(event.currentTarget).removeClass('selectedVendedor');
                $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.horarios, ven.id);
                $scope.gl.scopes.calendarios.deleteEvent($scope.gl.scopes.calendarios.calendars.vacaciones, ven.id);
            }
            else 
            {
                // Añadir vendedor a los seleccionados
                var x = angular.element(event.currentTarget).addClass('selectedVendedor');
                $scope.gl.scopes.calendarios.addEvent($scope.gl.scopes.calendarios.calendars.horarios, ven);
                $scope.gl.scopes.calendarios.addEvent($scope.gl.scopes.calendarios.calendars.vacaciones, ven);
            }
        };
        $scope.editarFicha = function (ven)
        {
            $scope.gl.submodulo = $scope.gl.submodulos.modifVendedor;
            
            if(!ven)
                ven = $scope.gl.vendedor;

            $scope.gl.changeView($scope.gl.ventanas.formulario);
        };
        $scope.showModal = function (event)
        {
            if(event.currentTarget.id == 'diarioLaboral_btn')
            {
                $scope.gl.showModal1 = true;
                $timeout(function () {
                    $('div.fc-toolbar > div.fc-right > button').click();
                });
            }
        };
        $scope.showFichajesDialog = function ()
        {
            $scope.gl.scopes.fichajes.filtroJornada = {};
            
            if($scope.gl.vendedor)
            {
                $scope.gl.scopes.calendarios.recalculateFichajes($scope.gl.vendedor);
            }
            
            $scope.gl.changeView($scope.gl.ventanas.auxiliar.fichajes,$scope.gl.ventanas.formulario);

            $timeout(function () {
                $scope.gl.scopes.calendarios.clickToday()
            });
        };

        $scope.showHorarioLaboral = function ()
        {
            $scope.gl.changeView($scope.gl.ventanas.auxiliar.horario, $scope.gl.ventanas.formulario);
        };
        
        $scope.showFichajesPorDiaDialog = function (event)
        {
            // Filtrar data por fecha de jornada
            var data = $scope.gl.scopes.fichajes.data;
            $scope.gl.scopes.fichajes.filtroJornada.fechaStr = event.id;
            $scope.gl.scopes.fichajes.currentTab = 1;
        };

        document.getElementById("container_box").style.display = 'block';

        //----------------- TECLADO STAFF CONTROL ------------------//
        // Globales y fijas
        // Con esta función vinculamos tb los input a las teclas
        var inputs = document.getElementsByTagName('input');
        for(var x in inputs)
            inputs[x].className += " mousetrap";
        Mousetrap.bind('esc', function(e) {
            document.getElementById('salir_btn').click();
        });

        // Vinculación de teclas
        $scope.$watch('gl.actualView', function (newValue)
        {
            // unbinding
            Mousetrap.unbind('enter'); Mousetrap.unbind('end');
            Mousetrap.unbind('right'); Mousetrap.unbind('left');
            Mousetrap.unbind('up'); Mousetrap.unbind('down');
            Mousetrap.unbind('+'); Mousetrap.unbind('-');
            Mousetrap.unbind('f1'); Mousetrap.unbind('f2');
            Mousetrap.unbind('f3'); Mousetrap.unbind('f4');
            Mousetrap.unbind('f5'); Mousetrap.unbind('f6');
            Mousetrap.unbind('f7'); Mousetrap.unbind('f8');

            switch (newValue)
            {
                // Vendedores
                case $scope.gl.ventanas.principal:
                    Mousetrap.bind('enter', function(e) {
                        // $scope.selectVendedor($scope.focusedIndex);
                        document.querySelector('.focusedVendedor').click();
                        $scope.$apply();
                    });
                    Mousetrap.bind('right', function(e) {
                        if($scope.focusedIndex < $scope.gl.data.vendedores.length)
                            $scope.focusedIndex += 1;
                        else
                            $scope.focusedIndex = 0;

                        $scope.$apply();
                    });
                    Mousetrap.bind('left', function(e) {
                        if($scope.focusedIndex > 0)
                            $scope.focusedIndex -= 1;
                        $scope.$apply();
                    });
                    Mousetrap.bind('+', function(e) {
                        document.querySelector('#staffControlPrincipal_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('-', function(e) {
                        document.querySelector('#staffControlPrincipal_box [name="siguientes_btn"] img').click();
                    });

                    $timeout(function () {
                        $scope.selectedIndex = -1;
                        // document.querySelectorAll('.vendedorDiv')[0].focus();
                    }, 0);
                    break;
                // Formulario
                case $scope.gl.ventanas.formulario:
                    Mousetrap.bind('f3', function(e) {
                        document.getElementById('horarioLaboral_btn').click();
                    });
                    Mousetrap.bind('f4', function(e) {
                        document.getElementById('diarioLaboral_btn').click();
                    });
                    Mousetrap.bind('f5', function(e) {
                        document.getElementById('historialLaboral_btn').click();
                    });
                    Mousetrap.bind('f6', function(e) {
                        document.getElementById('venta_btn').click();
                    });
                    Mousetrap.bind('+', function(e) {
                        document.querySelector('#staffControlFormulario_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('-', function(e) {
                        document.querySelector('#staffControlFormulario_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('end', function(e) {
                        document.getElementById('grabarVendedor_btn').click();
                    });
                    break;
                // Calendario fichajes
                case $scope.gl.ventanas.auxiliar.fichajes:
                    Mousetrap.bind('+', function(e) {
                        document.querySelector('#auxiliarFichajes_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('-', function(e) {
                        document.querySelector('#auxiliarFichajes_box [name="anteriores_btn"] img').click();
                    });
                    Mousetrap.bind('f7', function(e) {
                        document.getElementById('aniadirFichaje_btn').click();
                    });
                    Mousetrap.bind('f8', function(e) {
                        document.getElementById('guardarFichajes_btn').click();
                    });
                    break;
            }
        });

        // Desactivación de las teclas por defecto del navegador que interfieren con la aplicaición
        document.onkeydown = function (e) {
            // f1, f2, f3, f4
            if(e.which === 112 || e.which === 113 || e.which === 114 || e.which === 115) {
                return false;
            }
        };
    }]);
// Controlador de calendarios de los trabajadores
app.controller('calendariosCtrl',[ '$scope', '$timeout', '$rootScope','$translate', 'glService', 'selecService', 'staffService', 'uiCalendarConfig',
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
// Controlador de la paginación de los fichajes
app.controller('fichajesPagCtrl',[ '$scope', '$http', '$filter', '$translate', '$timeout', 'glService', 'crudService', 'selecService', 'staffService', 'uiCalendarConfig',
    function ($scope, $http, $filter, $translate, $timeout, glService, crudService, selecService, staffService, uiCalendarConfig)
    {
        $scope.gl = glService;
        $scope.crud = crudService;
        $scope.sel = selecService;
        $scope.staff = staffService;

        // Global seleccion
        $scope.gl.scopes.fichajes = $scope;

        $scope.currentPage = 0;
        $scope.pageSize = $scope.gl.calculateBySize(); // Esta la cantidad de registros que deseamos mostrar por p?gina
        $scope.pages = [];
        $scope.data = [];
        $scope.filteredData = [];
        $scope.fichaje = null;
        $scope.theadCols = [];
        $scope.detalleDia = false;
        $scope.filtroJornada = {};
        $scope.currentTab = 0;
        $scope.loc = {};
        $scope.currentObj = {};
        $scope.saveFichajes = false;
        $scope.newFichaje = false;
        $scope.newFic = 
        {
            fecha: new Date(),
            tipo: 'Trabajo'
        };
        
        // TOGGLES para controlar respuestas de las promesas
        $scope.toggles = {
            delFichaje: 0,
            newFichaje: 0
        };

        // Location
        $translate(['loc_AniadirFichaje', 'loc_Guardar', 'loc_Trabajo']).then(function (translations) 
        {
            $scope.loc.AniadirFichaje = translations.loc_AniadirFichaje;
            $scope.loc.Guardar = translations.loc_Guardar;
            $scope.loc.Trabajo = translations.loc_Trabajo;
        });        
        
        // Cabecera
        $translate(['loc_Fecha', 'loc_Tipo', 'loc_Entrada', 'loc_Salida', 'loc_Total', 'loc_Complementarias'])
            .then(function (translations) {
            $scope.theadCols = [translations.loc_Fecha, translations.loc_Tipo, translations.loc_Entrada, translations.loc_Salida
                , translations.loc_Total, translations.loc_Complementarias];
        });

        $scope.completeObj = function ($event)
        {
            $scope.crud.addObjToData('desde', $filter('date')($scope.sel.fechas.desde, 'dd-MM-yyyy'));
            $scope.crud.addObjToData('hasta', $filter('date')($scope.sel.fechas.hasta, 'dd-MM-yyyy'));

            var ruta = ($event) ? $event.currentTarget.attributes.name.nodeValue : null;

            if(ruta)
                $scope.sel.selecType = ruta;

            // Show loading spinner.
            // $scope.gl.loading = true;

            var response = $scope.crud.execute('complete','vendedor', $scope.gl.modulo, $scope.gl.vendedor, ruta);
            response.success(function(data, status, headers, config)
            {
                $scope.gl.vendedor = data.vendedor;
                $scope.initData();

                if($scope.gl.vendedor)
                    $scope.staff.reloadFichajes();

                // // Desbloqueamos vista
                // $timeout(function () {
                //     $scope.gl.loading = false;
                // })
            });
        };
        $scope.changeEntrada = function (index, value) 
        {
            // alert(index);            
        };
        $scope.resetDetalle = function () 
        {
            $scope.detalleDia = false;
            $scope.filtroDetalle = {};
        };
        $scope.isTabActive = function (index)
        {
            return $scope.currentTab == parseInt(index);
        };
        $scope.initData = function ()
        {
            $scope.filtroJornada = {};
            
            if($scope.gl.vendedor)
            {
                var data = [];

                $scope.staff.reloadFichajes($scope.gl.vendedor);

                for(var x in $scope.gl.vendedor.jornadas)
                {
                    for(var y in $scope.gl.vendedor.jornadas[x].fichajes)
                    {
                        data.push($scope.gl.vendedor.jornadas[x].fichajes[y]);
                    }
                }

                $scope.data = data;
            }
        };
        $scope.initData();
        
        $scope.printFichajeTotal = function (fic)
        {
            var str = '';

            if(fic)
            {
                if(fic.totalHoras > 0)
                    str += fic.totalHoras.toString() + ' h';
                if(fic.totalMinutos > 0)
                    str += ' ' + fic.totalMinutos + ' min';
            }

            return str;
        };
        
        $scope.changeFichaje = function (fic) 
        {
          if(fic)
          {
              var push = true;

              $scope.calculateNewTotal(fic);
              $scope.calculateNewComplementarias(fic);

              if(!$scope.gl.vendedor.toSaveFichajes)
                  $scope.gl.vendedor.toSaveFichajes = [];

              for(var x in $scope.gl.vendedor.toSaveFichajes)
              {
                  if($scope.gl.vendedor.toSaveFichajes[x].$$hashKey == fic.$$hashKey)
                  {
                      push = false;
                      break;
                  }
              }
              if(push)
                  $scope.gl.vendedor.toSaveFichajes.push(fic);
          }
        };

        $scope.calculateNewTotal = function (fic) 
        {
            if(fic.jsEntrada && fic.jsSalida && (fic.jsSalida.getHours()*60+fic.jsSalida.getMinutes()) > (fic.jsEntrada.getHours()*60+fic.jsEntrada.getMinutes()))
            {
                fic.totalHoras = fic.jsSalida.getHours() - fic.jsEntrada.getHours();
                fic.totalMinutos = fic.jsSalida.getMinutes() - fic.jsEntrada.getMinutes();
                
                if(fic.totalMinutos < 0)
                {
                    fic.totalHoras -= 1;
                    fic.totalMinutos = fic.totalMinutos + 60                    
                }
                
                fic.totalStr = $scope.printFichajeTotal(fic);
            }
            else
            {
                fic.totalStr = '';
            }
        };

        $scope.calculateNewComplementarias = function (fic)
        {
            var str = '';

            if(fic.horarios && fic.horarios.length > 0)
            {
                var esperado = 0;
                var trabajado = 0;
                var complementarias = 0;

                for(var x in fic.horarios)
                {
                    esperado += (fic.horarios[x].totalHoras * 60) + fic.horarios[x].totalMinutos;
                }

                trabajado += (fic.totalHoras * 60) + fic.totalMinutos;

                if(trabajado > esperado)
                {
                    complementarias = trabajado-esperado;

                    ent = Math.floor(complementarias/60);
                    dec = complementarias%60;
                    
                    if(ent > 0)
                        str += ent + ' h';
                    if(dec > 0)
                        str += ' ' + dec + ' min';

                    fic.compStr = str;
                }
            }
            else
            {
                fic.compStr = str;
            }

        };
        
        $scope.saveNewFichaje = function (fic)
        {
            if(fic)
            {
                var dateStr = '';
                var d = new Date();
                d.setTime(fic.fecha);
                
                fic.fecha = d;
                
                dateStr += fic.fecha.getFullYear()+'-';
                dateStr += fic.fecha.getMonth()+1+'-';
                dateStr += fic.fecha.getDate();
            }

            fic.fechaStr = dateStr;

            staffService.saveFichaje(fic, $scope.gl.vendedor, $scope.toggles);
        };

        $scope.confirmDeleteFichaje = function (ev, obj)
        {
            $scope.currentObj = obj;
            
            var func = function () {
                staffService.deleteFichaje($scope.currentObj, $scope.toggles);
            };
            
            $translate(['loc_ConfirmarBorrarFichaje', 'loc_Borrar', 'loc_Cancelar']).then(function (translations)
            {
                var msgs = [translations.loc_ConfirmarBorrarFichaje, translations.loc_Borrar, translations.loc_Cancelar];

                $scope.gl.scopes.footer.funcWaiting = func;
                $scope.gl.showMessage(Mensaje.types.normal, msgs[0], $scope.gl.actualView);
            });
        };
        
        $scope.extractFichajeFromData = function (oldFic, newJornada)
        {
            var fichajes = null;
            // Tenemos que encontrar este mismo fichaje que llega como parámetro dentro de los fichajes de la jornada a que corresponde la fecha del fichaje del vendedor
            if(oldFic && oldFic.fechaStr && $scope.gl.vendedor.jornadas[oldFic.fechaStr])
                fichajes = $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes;
            
            var deleteFic = function(x)
            {
                delete $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes[x];
                uiCalendarConfig.calendars.calendar3.fullCalendar('removeEvents', oldFic.fechaStr);

                var event = $scope.gl.scopes.calendarios.buildJornadaEvent(newJornada);
                
                uiCalendarConfig.calendars.calendar3.fullCalendar('renderEvent', event);
            };

            for(var x in fichajes)
            {
                var fic = $scope.gl.vendedor.jornadas[oldFic.fechaStr].fichajes[x];

                if(fic.entrada && fic.entrada.MMFch_id == fic.entrada.MMFch_id)
                    deleteFic(x);
                else if(fic.salida && fic.salida.MMFch_id == fic.salida.MMFch_id)
                    deleteFic(x);
            }
        };
        
        $scope.$watch('data', function () 
        {
            $scope.sel.configPages($scope);
        });

        $scope.$watch('gl.vendedor', function ()
        {
            $scope.initData();
        });

        /////////////////////////////// TOGGLES ////////////////////////////////////
        // Cada vez que se borra un fichaje
        $scope.$watch('toggles.delFichaje', function ()
        {
            if($scope.currentObj && $scope.gl.vendedor)
            {
                $scope.extractFichajeFromData($scope.currentObj, $scope.gl.vendedor.jornadas[$scope.currentObj.fechaStr]);
                $scope.gl.scopes.calendarios.showFichajesDialog();    
            }
        });
        // Cada vez que se crea un fichaje nuevo
        $scope.$watch('toggles.newFichaje', function ()
        {
            if($scope.gl.vendedor)
            {
                $scope.newFichaje = false;
                $scope.completeObj();
                $scope.initData();
                $scope.gl.scopes.calendarios.showFichajesDialog();
            }
        });
    }]);
app.directive('focusMe', function () {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {
                if(value === true) {
                    element[0].focus();
                }
            });
        }
    };
});
app.directive('clickMe', function () {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.clickMe, function(value) {
                if(value === true) {
                    element[0].click();
                }
            });
        }
    };
});
app.directive("msSpinA",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/spin-a.html'
    };

    return directiveDefinitionObject;
}]);
app.directive("msColorpicker",[function() {

    var directiveDefinitionObject ={
        restrict:"EA",
        replace : true,
        templateUrl: 'js/angular-app/templates/colorpicker.html',
        scope:{
            colors:"=",
            model:"="
        },
        link: function(scope, element, attrs)
        {
            scope.$watch('model', function ()
            {
                if(scope.model && scope.model.color)
                {
                    var selColor = '#' + scope.model.color;

                    controlColor(scope, element);
                }
            });

            scope.selectColor = function (ev)
            {
                var newColor = ev.currentTarget.getAttribute('data-color');
                scope.model.color = newColor;
                controlColor(scope, element);
            };

            var lastDiv;

            var controlColor = function (scope, element)
            {
                if(lastDiv)
                    lastDiv.removeClass('selectedOneColor');

                var div = element.find('[data-color="'+scope.model.color+'"]');
                lastDiv = div;

                div.addClass('selectedOneColor');
            }
        }
    };

    return directiveDefinitionObject;
}]);
app.directive("msAuxiliarMensaje",['$timeout', function($timeout) 
{
    var directiveDefinitionObject = 
    {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/auxiliar-mensaje.html',
        scope: {
            model: "=",
            autoclose: "="
        },
        link: function (scope, iElement, iAttrs, controller, transcludeFn)
        {
            var ac = scope.autoclose ? scope.autoclose : 1500;
            
            scope.types = Mensaje.types;
            scope.lastFondo = null;
            
            scope.$watch('model.mensaje', function () 
            {
                if(scope.model.mensaje)
                {
                    scope.model.changeView(scope.model.ventanas.auxiliar.mensaje, scope.model.fondo);

                    if(scope.model.mensaje.type == Mensaje.types.error ||
                        scope.model.mensaje.type == Mensaje.types.success)
                    {
                        $timeout(function () {
                            scope.model.scopes.footer.salir();
                            scope.model.mensaje.type = Mensaje.types.normal;
                        }, ac)
                    }    
                }
            });
        }
    };

    return directiveDefinitionObject;
}]);
app.directive("msAuxiliarArticulo",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/auxiliar-articulo.html',
        scope: {
            model: "="
        },
        link: function (scope, element, attrs)
        {
            scope.fotoIndex = 0;

            scope.selecFoto = function (index)
            {
                scope.fotoIndex = index;
            };
        }
    };

    return directiveDefinitionObject;
}]);
app.directive("msAuxiliarFichajes",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/auxiliar-fichajes.html',
        scope: {
            model: "="
        }
    };

    return directiveDefinitionObject;
}]);
app.directive("msAuxiliarHorario",['$timeout', 'formatService', 'staffService', function($timeout, formatService, staffService) {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/auxiliar-horario.html',
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
app.directive("msDatePicker",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/date-picker.html',
        scope:{
            model:"="
        }
    };

    return directiveDefinitionObject;
}]);
app.directive("msDesdeHasta",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/desde-hasta.html'
    };

    return directiveDefinitionObject;
}]);
app.directive("msPagBtns",[function() {

    var directiveDefinitionObject = {
        restrict: "EA",
        replace: true,
        templateUrl: 'js/angular-app/templates/anteriores-posteriores.html'
    };

    return directiveDefinitionObject;
}]);

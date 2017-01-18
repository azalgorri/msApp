// Controlador de selección de fechas
app.controller('datePickerCtrl', ['$scope', '$filter', 'selecService', 'glService', 
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
// Controlador de selección de horas
app.controller('timePickerCtrl', ['$scope', '$log',
    function ($scope, $log)
    {
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = false;
        $scope.toggleMode = function() {
            // $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
    }
]);
// Controlador de ventana de selección
app.controller('seleccionCtrl',[ '$scope', '$http', '$timeout', '$translate', 'glService', 'selecService', 'crudService',
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
                viewModels = data;

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
                viewModels = data;

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
// Controlador del footer
app.controller('footerCtrl', [ '$scope', '$http', '$filter', '$translate', '$timeout', '$compile', 'glService', 'selecService', 'crudService', 'staffService',
    function ($scope, $http, $filter, $translate, $timeout, $compile, glService, selecService, crudService, staffService)
    {
        $scope.gl = glService;
        $scope.sel = selecService;
        $scope.crud = crudService;
        $scope.staff = staffService;
        $scope.funcWaiting = null;
        
        $scope.forms = {
            newCliente: false
        };
        $scope.attempted = false;
        
        $scope.toggles = {
            newClienteForm: 0
        };
        
        $scope.gl.scopes.footer = $scope;
        
        $scope.salir = function (option)
        {
            var main = '/main-menu';

            switch ($scope.gl.modulo)
            {
                case 'client-dashboard':
                    
                    switch ($scope.gl.actualView)
                    {
                        case $scope.gl.ventanas.principal:
                            window.location.href = $scope.crud.appNamespace + main;
                            break;

                        case $scope.gl.ventanas.formulario:
                            $scope.gl.changeView($scope.gl.ventanas.principal);
                            break;

                        case $scope.gl.ventanas.seleccion:
                            $scope.gl.changeView($scope.gl.ventanas.formulario);
                            break;

                        case $scope.gl.ventanas.auxiliar.mensaje:
                        case $scope.gl.ventanas.vpr:
                            $scope.gl.changeView($scope.gl.ventanas.formulario);
                            break;
                    }
                    
                    break;

                case 'staff-control':

                    switch ($scope.gl.actualView)
                    {
                        case $scope.gl.ventanas.principal:
                            window.location.href = $scope.crud.appNamespace + main;
                            break;

                        case $scope.gl.ventanas.auxiliar.mensaje:
                        // case $scope.gl.ventanas.auxiliar.articulo:
                        case $scope.gl.ventanas.auxiliar.horario:
                            $scope.gl.lastView = $scope.gl.ventanas.formulario;
                            $scope.gl.changeView($scope.gl.ventanas.auxiliar.fichajes);
                            break;

                        case $scope.gl.ventanas.auxiliar.fichajes:
                            $scope.gl.changeView($scope.gl.ventanas.formulario);
                            break;
                        
                        case $scope.gl.ventanas.formulario:
                            $scope.gl.changeView($scope.gl.ventanas.principal);
                            break;
                        
                        case $scope.gl.ventanas.seleccion:
                            $scope.gl.changeView($scope.gl.ventanas.formulario);
                            break;
                                                
                        default:
                            $scope.gl.changeView($scope.gl.lastView);
                    }
                    
                    break;

                default:
                {
                    $scope.gl.fondo = -1;
                    $scope.gl.actualView += -1;
                }
            }
        };

        $scope.seleccionar = function ()
        {
            $scope.sel.doSelection($scope);
        };

        $scope.grabarCliente = function ()
        {
            var response = false;
            
            $scope.gl.loading = true;
            
            switch ($scope.gl.submodulo)
            {
                case $scope.gl.submodulos.conModCliente:
                    response = $scope.crud.execute('update','cliente',$scope.gl.modulo, $scope.gl.cliSelected);
                    response.success(function(data, status, headers, config)
                    {
                        $translate(['loc_ClienteModificado', 'loc_ClienteErrorGuardar']).then(function (translations) {
                            var success = [translations.loc_ClienteModificado];
                            var error = [translations.loc_ClienteErrorGuardar];

                            $scope.gl.loading = false;

                            if(data.operation && data.cliente)
                            {
                                $scope.gl.showMessage(Mensaje.types.success, success,  $scope.gl.ventanas.formulario);
                                // Añadimos el cliente modificado a la vista
                                $scope.gl.scopes.clientes.data.push(data.cliente);
                                $scope.gl.scopes.clientes.toggles.modCliente += 1;
                            }
                            else
                                $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);

                        });
                    });
                    break;

                case $scope.gl.submodulos.altaCliente:
                    response = $scope.crud.execute('create','cliente',$scope.gl.modulo, $scope.gl.cliSelected);
                    response.success(function(data, status, headers, config)
                    {
                        $translate(['loc_ClienteCreado', 'loc_ClienteErrorGuardar']).then(function (translations) {
                            var success = [translations.loc_ClienteCreado];
                            var error = [translations.loc_ClienteErrorGuardar];

                            $scope.gl.loading = false;

                            // $scope.gl.alert(data.operation, success, error);
                            if(data.operation && data.cliente)
                            {
                                $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);

                                // Añadimos el nuevo cliente a la vista
                                $scope.gl.scopes.clientes.data.push(data.cliente);
                                $scope.gl.scopes.clientes.toggles.newCliente += 1;
                                angular.element(document.getElementById('grabarCliente_btn')).hide();
                            }
                            else
                                $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);
                        });
                    });
                    break;
            }

            return response;
        };

        $scope.borrarCliente = function ()
        {
            $scope.gl.deleteFromDataById($scope.gl.scopes.clientes.data, $scope.gl.cliSelected);

            var response = $scope.crud.execute('delete','cliente',$scope.gl.modulo, $scope.gl.cliSelected);

            response.success(function(data, status, headers, config)
            {
                $translate(['loc_ClienteEliminado', 'loc_ClienteErrorBorrar']).then(function (translations) {
                    var success = [translations.loc_ClienteEliminado];
                    var error = [translations.loc_ClienteErrorBorrar];

                    if(data.operation)
                    {
                        $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);
                        $scope.gl.scopes.clientes.toggles.delCliente += 1;
                    }
                    else
                        $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);
                    
                });
            })
        };

        $scope.grabarVendedor = function ()
        {
            var response = false;

            response = $scope.crud.execute('update','vendedor',$scope.gl.modulo, $scope.gl.vendedor);
            response.success(function(data, status, headers, config)
                {
                    $translate(['loc_VendedorGuardado', 'loc_VendedorErrorGuardar']).then(function (translations)
                    {
                        var success = [translations.loc_VendedorGuardado];
                        var error = [translations.loc_VendedorErrorGuardar];

                        if(data.operation)
                            $scope.gl.showMessage(Mensaje.types.success, success, $scope.gl.ventanas.formulario);
                        else
                            $scope.gl.showMessage(Mensaje.types.error, error, $scope.gl.ventanas.formulario);
                    });
                });

            return response;
        };

        $scope.confirmar = function (event)
        {
            switch (angular.element(event.currentTarget).attr('name'))
            {
                case 'borrarCliente_btn':
                    $translate(['loc_confirmacionBorrado']).then(function (translations)
                    {
                        $scope.gl.showMessage(Mensaje.types.normal,[translations.loc_confirmacionBorrado], $scope.gl.ventanas.formulario);
                        $scope.funcWaiting = $scope.borrarCliente;
                    });
                    break;
            }
        };
        
        $scope.isActive = function (btn)
        {
            var res = false;

            switch ($scope.gl.modulo)
            {
                case 'staff-control':
                    switch (btn)
                    {
                        case 'salir_btn':
                            res = true;
                            break;
                        case 'grabarVendedor_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.formulario);
                            break;
                        case 'seleccionar_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.seleccion);
                            break;
                        case 'guardarFichajes_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.fichajes
                            && $scope.gl.scopes.fichajes.currentTab == 1
                            && $scope.gl.vendedor.toSaveFichajes
                            && $scope.gl.vendedor.toSaveFichajes.length > 0);
                            break;
                        case 'aniadirFichaje_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.fichajes
                            && $scope.gl.scopes.fichajes.currentTab == 1);
                            break;
                        case 'ok_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.mensaje
                            && $scope.gl.mensaje && $scope.gl.mensaje.type == Mensaje.types.normal);
                            break;
                    }
                    break;

                case 'client-dashboard':
                    switch (btn)
                    {
                        case 'salir_btn':
                            if($scope.gl.mensaje)
                            {
                                res = ($scope.gl.mensaje.type == Mensaje.types.normal) 
                            }
                            else res = true;
                            break;
                        
                        case 'nuevoCliente_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.principal);
                            break;

                        case 'borrarCliente_btn':
                            res = (($scope.gl.actualView == $scope.gl.ventanas.formulario)
                                && ($scope.gl.submodulo == $scope.gl.submodulos.conModCliente)
                                && $scope.gl.newCliente_form.$valid);
                            break;
                        
                        case 'ventasCliente_btn':
                        case 'prestamosCliente_btn':
                        case 'reservasCliente_btn':
                            res = (($scope.gl.actualView == $scope.gl.ventanas.formulario)
                                    && ($scope.gl.submodulo == $scope.gl.submodulos.conModCliente));
                            break;

                        case 'grabarCliente_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.formulario
                            && $scope.gl.newCliente_form.$valid
                            && !$scope.gl.newCliente_form.$pristine);
                            break;

                        case 'ok_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.auxiliar.mensaje
                            && $scope.gl.mensaje && $scope.gl.mensaje.type == Mensaje.types.normal);
                            break;

                        case 'seleccionar_btn':
                            res = ($scope.gl.actualView == $scope.gl.ventanas.seleccion);
                            break;
                    }
                    break;
            }

            return res;
        };
        
        $scope.$watch('newCliente_form.$valid', function(newVal)
        {
            var btn = angular.element(document.getElementById('grabarCliente_btn'));
            $scope.forms.newCliente = newVal;

            $scope.forms.newCliente ? btn.show() : btn.hide();
        });
    }]);
// Controlador de ventanas modales
app.controller('modalWindowCtrl', ['$scope', 'glService', function ModalController($scope, glService)
{
    $scope.gl = glService;

    $scope.title = "";
    $scope.fotoIndex = 0;

    $scope.gl.showModal1 = false;
    $scope.gl.showModal2 = false;

    $scope.hide = function(m){
        if(m === 1){
            $scope.gl.showModal1 = false;
        }else{
            $scope.gl.showModal2 = false;
        }
    };

    $scope.modalOneShown = function(){
        console.log('model one shown');
    };

    $scope.modalOneHide = function(){
        console.log('model one hidden');
    }

    $scope.selecFoto = function (index) {
        $scope.fotoIndex = index;
    };
}]);
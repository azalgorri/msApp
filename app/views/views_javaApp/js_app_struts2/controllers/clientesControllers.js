// Controlador principal del módulo client-dashboard
app.controller('clientesCtrl',[ '$scope', '$timeout', '$filter', 'glService', 'selecService', 'crudService',
    function ($scope, $timeout, $filter, glService, selecService, crudService)
    {
        $scope.gl = glService;
        $scope.sel = selecService;
        $scope.crud = crudService;

        $scope.gl.modulo = 'client-dashboard';
        $scope.gl.submodulos = {
            conModCliente: 0,
            altaCliente: 1,
            ventasCliente: 2
        };
        $scope.gl.submodulo = $scope.gl.submodulos.conModCliente;
        $scope.gl.selectedIndex = 0;
        
        $scope.gl.scopes.clientes = $scope;
        
        $scope.completeObj = function ($event)
        {
            $scope.crud.addObjToData('desde', $filter('date')($scope.sel.fechas.desde, 'dd-MM-yyyy'));
            $scope.crud.addObjToData('hasta', $filter('date')($scope.sel.fechas.hasta, 'dd-MM-yyyy'));

            var ruta = ($event) ? $event.currentTarget.attributes.name.nodeValue : null;

            if(ruta)
                $scope.sel.selecType = ruta;

            // Show loading spinner.
            $scope.gl.loading = true;

            var response = $scope.crud.execute('complete','cliente', $scope.gl.modulo, $scope.gl.cliSelected, ruta);
            response.success(function(data, status, headers, config)
            {
                $scope.gl.cliSelected = data.cliente;

                if($scope.gl.cliSelected)
                {
                    $scope.gl.scopes.vpr.totalValor = 0;
                    $scope.gl.scopes.vpr.currentPage = 0;
                    // Por defecto ponemos el tipo de tabla de ventas y prestamos
                    $scope.gl.scopes.vpr.tipoTabla = $scope.gl.scopes.vpr.tipos.ventasPrestamos;
                    $scope.gl.scopes.vpr.totalValor = 0;
                    $scope.gl.scopes.vpr.totalUnidades = 0;

                    switch ($scope.sel.selecType)
                    {
                        case 'ventas':
                            $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.ventas;
                            for(var x in $scope.gl.cliSelected.ventas)
                            {
                                $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.ventas[x].neto;
                                $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.ventas[x].unidades;
                            }
                            break;

                        case 'prestamos':
                            $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.prestamos;
                            for(var x in $scope.gl.cliSelected.prestamos)
                            {
                                $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.prestamos[x].neto;
                                $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.prestamos[x].unidades;
                            }
                            break;

                        case 'reservas':
                            $scope.gl.scopes.vpr.tipoTabla = $scope.gl.scopes.vpr.tipos.reservas;
                            $scope.gl.scopes.vpr.data = $scope.gl.cliSelected.reservas;
                            for(var x in $scope.gl.cliSelected.reservas)
                            {
                                $scope.gl.scopes.vpr.totalValor += $scope.gl.cliSelected.reservas[x].precio;
                                $scope.gl.scopes.vpr.totalUnidades += $scope.gl.cliSelected.reservas[x].unid;
                            }
                            break;
                    }

                }
                
                // Desbloqueamos vista
                $scope.gl.changeRoute($scope.gl.ventanas.vpr, ruta);
                $timeout(function () {
                    $scope.gl.loading = false;
                })
            });
        };
        
        //----------------- TECLADO CLIENT DASHBOARD ------------------//
        // Globales y fijas
        // Con esta función vinculamos tb los input a las teclas
        var inputs = document.getElementsByTagName('input');
        for(var x in inputs)
            inputs[x].className += " mousetrap";
        Mousetrap.bind('esc', function(e) {
            document.getElementById('salir_btn').click();
        });
        // Letras de la derecha
        $scope.bindLetrasKeys = function (option)
        {
            for(var x in $scope.letras)
            {
                Mousetrap.unbind($scope.letras[x].toLowerCase());
                if(option)
                {
                    Mousetrap.bind($scope.letras[x].toLowerCase(), function(e, combo) {
                        document.getElementById(combo.toUpperCase()+'_btn').click();
                    });
                }
            }
        };
        // Vinculación de teclas y control de foco
        $scope.$watch('gl.actualView', function (newValue)
        {
            // unbinding
            Mousetrap.unbind('enter'); Mousetrap.unbind('end');
            Mousetrap.unbind('right'); Mousetrap.unbind('left');
            Mousetrap.unbind('up'); Mousetrap.unbind('down');
            Mousetrap.unbind('+'); Mousetrap.unbind('-');
            Mousetrap.unbind('f1'); Mousetrap.unbind('f2');
            Mousetrap.unbind('f3'); Mousetrap.unbind('f4');

            switch (newValue)
            {
                // Clientes Paginación
                case $scope.gl.ventanas.principal:
                    Mousetrap.bind('enter', function(e) {
                        $scope.gl.scopes.clientes.selectCliente($scope.gl.selectedIndex);
                        $scope.$apply();
                    });
                    Mousetrap.bind('right', function(e) {
                        $scope.gl.selectedIndex += 1;
                        $scope.$apply();
                    });
                    Mousetrap.bind('left', function(e) {
                        if($scope.gl.selectedIndex > 0)
                            $scope.gl.selectedIndex -= 1;
                        $scope.$apply();
                    });
                    Mousetrap.bind('up', function(e) {
                        if($scope.gl.selectedIndex > 0)
                            $scope.gl.selectedIndex -= 4;
                        $scope.$apply();
                    });
                    Mousetrap.bind('down', function(e) {
                        $scope.gl.selectedIndex += 4;
                        $scope.$apply();
                    });
                    Mousetrap.bind('+', function(e) {
                        document.querySelector('#clientesPag_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('-', function(e) {
                        document.querySelector('#clientesPag_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('ins', function(e) {
                        document.querySelector('#nuevoCliente_btn img').click();
                    });
                    $scope.bindLetrasKeys(true);
                    $timeout(function () {
                        document.querySelector('input').focus();
                    }, 0);
                    break;
                // Formulario
                case $scope.gl.ventanas.formulario:
                    Mousetrap.bind('f1', function(e) {
                        document.getElementById('ventasCliente_btn').click();
                    });
                    Mousetrap.bind('f2', function(e) {
                        document.getElementById('prestamosCliente_btn').click();
                    });
                    Mousetrap.bind('f3', function(e) {
                        document.getElementById('reservasCliente_btn').click();
                    });
                    Mousetrap.bind('f4', function(e) {
                        document.getElementById('borrarCliente_btn').click();
                    });
                    Mousetrap.bind('end', function(e) {
                        document.getElementById('grabarCliente_btn').click();
                    });
                    $timeout(function () {
                        document.getElementById('tarjetaAlta').focus();
                    }, 0);
                    break;
                // Seleccion
                case $scope.gl.ventanas.seleccion:
                    Mousetrap.bind('up', function(e) {
                        if($scope.sel.rowIndex != 0)
                            $scope.sel.rowIndex -= 1;
                        document.querySelectorAll('tbody tr')[$scope.sel.rowIndex].click();
                    });
                    Mousetrap.bind('down', function(e) {
                        if($scope.sel.rowIndex < document.querySelectorAll('tbody tr').length-1)
                            $scope.sel.rowIndex += 1;
                        document.querySelectorAll('tbody tr')[$scope.sel.rowIndex].click();
                    });
                    break;
                // Auxiliar
                case $scope.gl.ventanas.auxiliar.mensaje:
                    Mousetrap.bind('enter', function(e) {
                        document.getElementById('ok_btn').click();
                    });
                    break;
                // VPR
                case $scope.gl.ventanas.vpr:
                    Mousetrap.bind('+', function(e) {
                        document.querySelector('#vprCliente_box [name="siguientes_btn"] img').click();
                    });
                    Mousetrap.bind('-', function(e) {
                        document.querySelector('#vprCliente_box [name="anteriores_btn"] img').click();
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

        document.getElementById("container_box").style.display = 'block';
    }]);
// Controlador de la paginación de los clientes
app.controller('clientesPagCtrl',[ '$scope', '$http','$filter', '$timeout', 'glService', 'crudService', 'formatService', 'selecService',
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
// Controlador de la paginación de las ventas, préstamos y reservas
app.controller('vprPagCtrl',[ '$scope', '$http','$filter', '$translate', 'glService', 'crudService', 'selecService',
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


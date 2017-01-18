// Servicio global de la aplicación
function Global()
{
    this.imgURL = '172.20.120.138:8282';
    this.modulo = '';
    this.submodulos = {};
    this.submodulo = '';
    this.loading = false;
    this.botones = [];
    this.data =
    {
        clientes: [],
        ventas: [],
        vendedores: []
    };
    this.outputFiltered = [];
    this.vendedor = null;
    this.vendedoresSeleccionados = [];
    this.usrDatas = [];
    this.cliSelected = null;
    this.lastView = 1;
    this.actualView = 1;
    this.ruta = {};
    this.fondo = 0;
    this.mensaje = null;
    this.ventanas =
    {
        principal: 1,
        formulario: 2,
        seleccion: 3,
        auxiliar: {
            mensaje: 4,
            articulo: 4.1,
            fichajes: 4.2,
            horario: 4.3
        },
        vpr: 5
    };
    this.scopes =
    {
        clientes: null,
        vendedores: null,
        vpr: null,
        calendarios: null,
        fichajes: null,
        footer: null
    };
    this.colorsInPicker = [
        '7FFFDE',
        '7F00FF',
        'D2D2D2',
        'FFBF3F',
        '01AB2B',
        'AB0156',
        'FFD500',
        '038282'
    ];
    
    this.changeView = function (v, fondo)
    {
        this.fondo = fondo;
        if(v == this.ventanas.auxiliar.fichajes || this.actualView == this.ventanas.auxiliar.fichajes)
        {
            document.getElementsByTagName('body')[0].classList.toggle('stop-scrolling');
        }
        
        if(this.actualView)
            this.lastView = this.actualView.valueOf();
        this.actualView = v;
    };

    this.changeRoute = function(v, target)
    {
        this.lastView = this.actualView.valueOf();
        this.actualView = v;
        this.ruta = target;
    };

    this.deleteFromDataById = function (data, sel)
    {
        for(var x in data)
        {
            if(data[x] && sel && sel.id )
            {
                if(data[x].id == sel.id)
                {
                    delete data[x];
                    break;
                }
            }
        }
    };

    this.comparator = function(actual, expected)
    {
        return (actual.indexOf(expected) === 0);
    };

    this.clearForm = function(form)
    {
        var inputs = form.getElementsByTagName('input');
        var selects = form.getElementsByTagName('select');

        for(var x in inputs)
            inputs[x].value = '';

        for(var x in selects)
            selects[x].value = -1;
    };

    this.validateInput = function(input){
        var res = '';

        if (input.$invalid && input.$touched)
            res = 'requiredInput';

        return res;
    };
    
    this.showMessage = function(type, text, fondo)
    {
        if(fondo)
            this.fondo = fondo;

        var autoclose = (type == Mensaje.types.error || type == Mensaje.types.success);
        this.mensaje = new Mensaje(type, text, autoclose);
    };

    this.calculateBySize = function(num)
    {
        var v = 90;

        if(num)
        {
            switch (num)
            {
                case 1:
                    v = 50;
                    break;
                case 2:
                    v = 150;
                    break;
                case 3:
                    v = 250;
                    break;
                case 4:
                    v = 350;
                    break;
                case 5:
                    v = 450;
                    break;
            }
        }
        
        return Math.round(angular.element(document).height()/v);
    };

    this.resetFormValidation = function (form) {
        form.$setPristine();
        form.$setUntouched();
    };
}
app.service("glService", [Global]);
// Servicio específico del módulo staff-control de la aplicación
function StaffControl($filter, $translate, $timeout, glService, crudService, selecService, formatService)
{
    var staff = this;

    this.completeVendedor = function (event) 
    {
        crudService.addObjToData('desde', $filter('date')(selecService.fechas.desde, 'dd-MM-yyyy'));
        crudService.addObjToData('hasta', $filter('date')(selecService.fechas.hasta, 'dd-MM-yyyy'));

        var ruta = (event) ? event.currentTarget.attributes.name.nodeValue : null;

        if(ruta)
            selecService.selecType = ruta;

        // Show loading spinner.
        glService.loading = true;

        var response = crudService.execute('complete','vendedor', glService.modulo, glService.vendedor, ruta);
        response.success(function(data, status, headers, config)
        {
            glService.vendedor = data.vendedor;
            if(glService.vendedor && glService.scopes.fichajes)
            {
                glService.scopes.fichajes.data = glService.vendedor.fichajes;
            }

            if(glService.vendedor)
                staff.reloadFichajes();

            // // Desbloqueamos vista
            $timeout(function () {
                glService.loading = false;
            })
        });
    };
    
    this.reloadFichajes = function (ven)
    {
        var vendedor = ven ? ven : glService.vendedor;

        for(var x in vendedor.jornadas)
        {
            for(var y in vendedor.jornadas[x].fichajes)
            {
                if(vendedor.jornadas[x].fichajes[y].entrada)
                {
                    var d = new Date(vendedor.jornadas[x].fichajes[y].entrada.MMFch_fichaje);
                    d.setSeconds(0);
                    vendedor.jornadas[x].fichajes[y].jsEntrada = d;
                }
                else
                    vendedor.jornadas[x].fichajes[y].jsEntrada = "";

                if(vendedor.jornadas[x].fichajes[y].salida)
                {
                    var d = new Date(vendedor.jornadas[x].fichajes[y].salida.MMFch_fichaje);
                    d.setSeconds(0);
                    vendedor.jornadas[x].fichajes[y].jsSalida = d;
                }
                else
                    vendedor.jornadas[x].fichajes[y].jsSalida = "";
            }
        }
    };

    this.reloadVacaciones = function (ven)
    {
        var vendedor = ven ? ven : glService.vendedor;

        vendedor.vacaciones.totalDias = [];
        
        for(var x in vendedor.vacaciones)
        {
            if(vendedor.vacaciones[x].start && vendedor.vacaciones[x].end)
            {
                var auxDate = moment(vendedor.vacaciones[x].start);
                var auxStart = moment(vendedor.vacaciones[x].start);
                var auxEnd = moment(vendedor.vacaciones[x].end);

                while(auxStart.isBefore(auxEnd))
                {
                    vendedor.vacaciones.totalDias.push(moment(auxStart));
                    auxStart.add(1, 'days');
                }

                vendedor.vacaciones.totalDias.push(moment(auxEnd));
            }
        }
    };

    this.saveFichajes = function ()
    {
        var res = crudService.execute('update','fichajes', glService.modulo, glService.vendedor);

        res.success(function(data, status, headers, config)
        {
            var data = data;

            // glService.vendedor = data.vendedor;
            
            $translate(['loc_FichajesActualizados', 'loc_FichajesErrorActualizar']).then(function (translations)
            {
                var msgs = [translations.loc_FichajesActualizados, translations.loc_FichajesErrorActualizar];

                if(data.operation)
                {
                    glService.scopes.fichajes.completeObj();
                    glService.scopes.fichajes.initData();
                    glService.scopes.fichajes.recalculateFichajes(glService.vendedor);
                    glService.alert(data.operation, msgs[0], msgs[1]);
                }
            });
        })
    };

    this.saveFichaje = function (fichaje, vendedor, toggles)
    {
        // Hay que controlar que el día de los fichajes a añadir esté dentro de los días de los horarios
        if(fichaje != '' && vendedor.jornadas[fichaje.fechaStr])
        {
            crudService.addObjToData('vendedor', vendedor);

            var res = crudService.execute('create','fichaje', glService.modulo, fichaje);

            res.success(function(data, status, headers, config)
            {
                glService.vendedor =  data.vendedor;
                var operation = data.operation;

                $translate(['loc_FichajeGuardado', 'loc_FichajeErrorGuardar']).then(function (translations)
                {
                    var msgs = [translations.loc_FichajeGuardado, translations.loc_FichajeErrorGuardar];

                    toggles.newFichaje += 1;
                    // if(operation)
                    //     glService.showMessage(Mensaje.types.success, msgs[0], glService.ventanas.auxiliar.fichajes);
                    // else
                    //     glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
                });
            })
        }
        else 
        {
            $translate(['loc_FichajeGuardado', 'loc_FichajeFueraDeHorario']).then(function (translations)
            {
                var msgs = [translations.loc_FichajeGuardado, translations.loc_FichajeFueraDeHorario];

                glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
            });
        }
    };

    this.deleteFichaje = function (fichaje, toggles)
    {
        crudService.addObjToData('desde', $filter('date')(selecService.fechas.desde, 'dd-MM-yyyy'));
        crudService.addObjToData('hasta', $filter('date')(selecService.fechas.hasta, 'dd-MM-yyyy'));

        var res = crudService.execute('delete','fichaje', glService.modulo, fichaje);

        res.success(function(data, status, headers, config)
        {
            glService.vendedor = data.vendedor;
            var operation = data.operation;

            $translate(['loc_FichajeEliminado', 'loc_FichajeErrorBorrar']).then(function (translations)
            {
                var msgs = [translations.loc_FichajeEliminado, translations.loc_FichajeErrorBorrar];

                if(operation)
                {
                    toggles.delFichaje += 1;
                    // glService.showMessage(Mensaje.types.success, msgs[0], glService.ventanas.auxiliar.fichajes);
                }
                // else
                    // glService.showMessage(Mensaje.types.error, msgs[1], glService.ventanas.auxiliar.fichajes);
            });
        })
    }

}
app.service("staffService", ["$filter", "$translate", "$timeout", "glService", "crudService", "selecService", "formatService", StaffControl]);
// Servicio para manejar las llamadas ajax de la aplicación
function Crud($http)
{
    this.appNamespace = "/mobile-store";
    this.ajaxData = {};
    this.ajaxData["viewModels"] = {};

    this.ajaxObjectCall = function (actionUrl, key, postData)
    {
        var response = $http({
            method: 'POST',
            url: actionUrl,
            data: JSON.stringify(this.ajaxData),
            dataType: 'json',
            contentType: 'application/json'
        })
            .error(function(data, status, headers, config) {
                alert("Ha fallado la petici%oacute;n. Estado HTTP:"+status);
            });

        return response;
    };

    this.addObjToData = function (key, obj)
    {
        if(obj)
        {
            var dataObj = (typeof obj == 'object') ? JSON.stringify(obj) : obj;
            this.ajaxData["viewModels"][key] = dataObj;
        }
    };

    this.removeFromData = function (key)
    {
        if(key)
        {
            delete this.ajaxData["viewModels"][key];
        }
    };

    this.execute = function (action, entity, namespace, valor, option)
    {
        var url = this.appNamespace;
        var key = "";

        if(!valor)
            valor = "";

        if(namespace && namespace != "")
            url += "/"+namespace;

        switch (action)
        {
            // SELECT ENTITY
            case 'select':
                key = 'seleccion';
                url += "/select-" + entity;
                break;
            
            // CREATE ENTITY
            case 'create':
                this.removeFromData('modificacion');
                key = 'alta';
                url += "/new-" + entity;
                break;

            // UPDATE ENTITY
            case 'update':
                this.removeFromData('alta');
                key = 'modificacion';
                url += "/new-" + entity;
                break;

            // READ ENTITY
            case 'read':
                key = 'filtro';
                url += "/find-" + entity;
                break;

            // DELETE ENTITY
            case 'delete':
                key = 'baja';
                url += "/delete-" + entity;
                break;

            // DELETE ENTITY
            case 'complete':
                this.addObjToData("option", option);
                key = 'completar';
                url += "/complete-" + entity;
                break;
        }

        this.addObjToData(key, valor);

        return  $http({
            method: 'POST',
            url: url,
            data: JSON.stringify(this.ajaxData),
            dataType: 'json',
            contentType: 'application/json'
        })
            .error(function(data, status, headers, config) {
                alert("Ha fallado la peticion. Estado HTTP:"+status);
            });
    };
}
app.service("crudService", ["$http", Crud]);
// Servicio para manejar las ventanas de seleccion
function Seleccion()
{
    this.entity = '';
    this.selectType = '';
    this.theadCols = [];
    this.tbodyRows = [];
    this.selectedIndex = null;
    this.rowIndex = -1;
    this.selectedObj = null;
    this.fechas = {
        desde: new Date(),
        hasta: new Date(),
        newOne: new Date()
    };
    this.selectedTr = null;
    this.foto = false;
    this.paginacion = false;
    this.codigoEntity = '';

    this.selectRow = function (index, e)
    {
        this.selectedObj = this.filteredData[index];
        this.selectedTr = angular.element(e.target).parent();
        this.rowIndex = index;
    };
    this.selectFirst = function ()
    {
        // Seleccionamos el primer elemento de la lista
        if(typeof document.querySelectorAll('tbody tr')[0] != 'undefined')
            document.querySelectorAll('tbody tr')[0].click();
    };
    this.doSelection = function (scope)
    {
        switch (scope.gl.modulo)
        {
            case 'client-dashboard':
                switch (scope.sel.entity)
                {
                    case 'cliente':
                        scope.gl.cliSelected = scope.sel.selectedObj;
                        this.codigoEntity = scope.gl.cliSelected.codigo;
                        var res = scope.crud.execute('find','clientes', scope.gl.modulo, scope.gl.cliSelected);

                        res.success(function(data, status, headers, config)
                        {
                            viewModels = data;
                            scope.gl.cliSelected = viewModels.cliente;
                        });
                        break;

                    case 'estado':
                        scope.gl.cliSelected.estado = scope.sel.selectedObj;
                        this.codigoEntity = scope.gl.cliSelected.estado.codigo;
                        scope.gl.cliSelected.provincia = undefined;
                        break;

                    case 'provincia':
                        scope.gl.cliSelected.provincia = scope.sel.selectedObj;
                        this.codigoEntity = scope.gl.cliSelected.provincia.codigo;
                        break;
                }

                switch (scope.gl.submodulo)
                {
                    case scope.gl.submodulos.conModCliente:
                    case scope.gl.submodulos.altaCliente:
                        scope.gl.changeView(scope.gl.ventanas.formulario);
                        break;

                    case 'ventas-cliente':
                        scope.gl.changeView(scope.gl.ventanas.principal);
                        break;
                }
                break;

            case 'staff-control':
                switch (scope.sel.entity)
                {
                    case 'estado':
                        scope.gl.vendedor.estado = scope.sel.selectedObj;
                        this.codigoEntity = scope.gl.vendedor.estado.codigo;
                        scope.gl.vendedor.provincia = undefined;
                        break;

                    case 'provincia':
                        scope.gl.vendedor.provincia = scope.sel.selectedObj;
                        this.codigoEntity = scope.gl.vendedor.provincia.codigo;
                        break;
                }
                switch (scope.gl.submodulo)
                {
                    case scope.gl.submodulos.modifVendedor:
                        scope.gl.changeView(scope.gl.ventanas.formulario);
                        break;
                }
                break;
        }
        
    };

    this.configPages = function (scope)
    {
        var d = null;

        if(typeof total != 'undefined')
            d=total;
        else
        {
            if(scope.dData)
                d=scope.dData;
            else
                d=scope.data;
        }

        scope.pages.length = 0;
        var ini = scope.currentPage - 4;
        var fin = scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil(d.length / scope.pageSize) > 10) fin = 10;
            else fin = Math.ceil(d.length / scope.pageSize);
        } else {
            if (ini >= Math.ceil(d.length / scope.pageSize) - 10) {
                ini = Math.ceil(d.length / scope.pageSize) - 10;
                fin = Math.ceil(d.length / scope.pageSize);
            }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
            scope.pages.push({ no: i });
        }
        // if (scope.currentPage >= scope.pages.length)
        //     scope.currentPage = scope.pages.length - 1;
    };
}
app.service("selecService", [Seleccion]);
// Servicio para manejar cambios de formato
function Format()
{
    this.formatClientData = function (cli)
    {
        // Fecha
        var fecha = [];
        if(cli.fechaNac != null && cli.fechaNac.length == 8)
        {
            fecha[0] = cli.fechaNac.substring(0,4);
            fecha[1] = cli.fechaNac.substring(4,6);
            fecha[2] = cli.fechaNac.substring(6,8);

            cli.fechaNac = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
        }

        return cli;
    };

    this.dateToString = function (date, format)
    {
        var str = '';
        
        if(date instanceof Date)
        {
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();

            switch (format)
            {
                case 'dd-MM-yyyy':
                    str += (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
                    break;
                
                case 'dd/MM/yyyy':
                    str += day + '/' + month + '/' + year;
                    break;
            }
        }
        
        return str;
    };
    
    this.stringToDate = function (string, format)
    {
        var date = null;
        var array = [];

        if(string.includes('-'))
            array = string.split('-');
        else if(string.includes('/'))
            array = string.split('/');        

        if(string.includes('-') || string.includes('/') && array.length > 0 && format)
        {
            date = new Date();
            
            switch (format)
            {
                case 'yyyy-MM-dd':
                case 'yyyy/MM/dd':
                    date.setFullYear(array[0]);
                    date.setMonth(array[1]);
                    date.setDate(array[2]);
                    break;

                case 'dd-MM-yyyy':
                case 'dd/MM/yyyy':
                    date.setFullYear(array[2]);
                    date.setMonth(array[1]);
                    date.setDate(array[0]);
                    break;
            }
        }
        
        return date;
    }
}
app.service("formatService", [Format]);
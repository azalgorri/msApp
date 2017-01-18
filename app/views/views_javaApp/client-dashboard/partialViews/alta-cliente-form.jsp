<form id="newCliente_form" name="gl.newCliente_form"
       novalidate>
    <div class="col-xs-12 sinpadding">

        <div class="form-group row col-xs-6">
            <label id="loc_nTarjetaCliente" translate="loc_nTarjetaCliente" for="tarjetaAlta" class="col-xs-6 customLabel"></label>
            <input id="tarjetaAlta" name="tarjetaInput" ng-model="gl.cliSelected.tarjeta" class="col-xs-6 customInput" type="text">
        </div>

        <div class="form-group row col-xs-6" name="requiredElement"
             data-ng-class="{'requiredInput' : gl.newCliente_form.nombreInput.$invalid && gl.newCliente_form.nombreInput.$touched}">
            <label id="loc_NombreCli" for="nombreAlta" class="col-xs-offset-1 col-xs-5 customLabel">
                <span data-ng-show="gl.newCliente_form.nombreInput.$invalid"> * </span>
                <span translate="loc_Nombre"></span>
            </label>
            <input id="nombreAlta" name="nombreInput" class="col-xs-6 customInput" type="text"
                   ng-model="gl.cliSelected.nombre" required>
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_Apellidos" translate="loc_Apellidos" for="apellidosAlta" class="col-xs-6 customLabel"></label>
            <input id="apellidosAlta" name="apellidosInput" ng-model="gl.cliSelected.apellidos" class="col-xs-6 customInput" type="text">
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_Direccion" translate="loc_Direccion" for="direccionAlta" class="col-xs-offset-1 col-xs-5 customLabel"></label>
            <input id="direccionAlta" name="direccionInput" ng-model="gl.cliSelected.direccion" class="col-xs-6 customInput" type="text">
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_CP" translate="loc_CP" for="cpAlta" class="col-xs-6 customLabel"></label>
            <input id="cpAlta" name="cpInput" ng-model="gl.cliSelected.cp" class="col-xs-6 customInput" type="text">
        </div>
        <div class="form-group row col-xs-6">
            <label id="loc_PoblacionCli" translate="loc_Poblacion" for="poblacionAlta" class="col-xs-offset-1 col-xs-5 text-left customLabel"></label>
            <input id="poblacionAlta" name="poblacionInput" class="col-xs-6 customInput" type="text" ng-model="gl.cliSelected.poblacion">
        </div>

        <div ng-controller="seleccionCtrl">
            <div class="form-group row col-xs-12">
                <label id="loc_Estado" translate="loc_Estado" for="estadoAlta" class="col-xs-3 customLabel"></label>
                <input id="estadoAlta" name="estadoInput" class="col-xs-3 customInput" type="text" ng-model="gl.cliSelected.estado.codigo" ng-keyup="$event.keyCode == 13 && filter($event)">
                <a id="buscarEstado_btn" name="buscarEstado_btn" class="col-xs-1" href="#">
                    <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg"
                         ng-click="buscarEstados()">
                </a>
                <div id="estadoAltaInfo" name="estadoInfo" ng-bind="gl.cliSelected.estado.nombre" class="col-xs-3 estado infoInput"><p></p></div>
            </div>

            <div class="form-group row col-xs-12" data-ng-if="gl.cliSelected && gl.cliSelected.estado">
                <label id="loc_Provincia" translate="loc_Provincia" for="provinciaAlta" class="col-xs-3 customLabel"></label>
                <input id="provinciaAlta" name="provinciaInput" class="col-xs-3 customInput" type="text" ng-model="gl.cliSelected.provincia.codigo" ng-keyup="$event.keyCode == 13 && filter($event)" >
                <a id="buscarProvincia_btn" name="buscarProvincia_btn" class="col-xs-1" href="#">
                    <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg"
                         ng-click="buscarPovincias()">
                </a>
                <div id="provinciaAltaInfo" name="provinciaInfo" ng-bind="gl.cliSelected.provincia.nombre" class="col-xs-3 provincia infoInput"><p></p></div>
            </div>
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_Telefono" translate="loc_Telefono" for="tfnFijoAlta" class="col-xs-6 customLabel"></label>
            <input id="tfnFijoAlta" name="tfnFijoInput" ng-model="gl.cliSelected.telef1" class="col-xs-6 customInput" type="text" >
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_Fax" translate="loc_Fax" for="faxAlta" class="col-xs-offset-1 col-xs-5 customLabel"></label>
            <input id="faxAlta" name="faxInput" ng-model="gl.cliSelected.fax" class="col-xs-6 customInput" type="text" >
        </div>

        <div class="form-group row col-xs-6">
            <label id="loc_TelefMovil" translate="loc_TelefMovil" for="tfnMovilAlta" class="col-xs-6 customLabel"></label>
            <input id="tfnMovilAlta" name="tfnMovilInput" ng-model="gl.cliSelected.telefMovil" class="col-xs-6 customInput" type="text" >
        </div>

        <div class="form-group row col-xs-6" name="requiredElement"
             data-ng-class="{'requiredInput' : gl.newCliente_form.dniInput.$invalid && gl.newCliente_form.dniInput.$touched}">
            <label id="loc_DNICli" for="dniAlta" class="col-xs-offset-1 col-xs-5 customLabel">
                <span data-ng-show="gl.newCliente_form.dniInput.$invalid"> * </span>
                <span translate="loc_DNI"></span>
            </label>
            <input id="dniAlta" name="dniInput" class="col-xs-6 customInput" type="text" pattern="[0-9]{8}[a-zA-Z]{1}"
                   ng-model="gl.cliSelected.dni" required>
        </div>

        <div class="form-group row col-xs-6" name="requiredElement"
             data-ng-class="{'requiredInput' : gl.newCliente_form.fechaNacInput.$invalid && gl.newCliente_form.fechaNacInput.$touched}">
            <label id="loc_FechaNac" for="fechaNacAlta" class="col-xs-6 customLabel">
                <span data-ng-show="gl.newCliente_form.fechaNacInput.$invalid"> * </span>
                <span translate="loc_FechaNac"></span>
            </label>
            <input id="fechaNacAlta" name="fechaNacInput" class="col-xs-6 customInput" type="text" placeholder="dd-mm-aaaa"
                   ng-model="gl.cliSelected.fechaNac" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])-(0[1-9]|1[012])-[0-9]{4}" required>
        </div>

        <div class="form-group row col-xs-6" name="requiredElement"
             data-ng-class="{'requiredInput' : gl.newCliente_form.emailInput.$invalid && gl.newCliente_form.emailInput.$touched}">
            <label id="loc_EmailCli" for="emailAlta" class="col-xs-offset-1 col-xs-5 customLabel">
                <span data-ng-show="gl.newCliente_form.emailInput.$invalid"> * </span>
                <span translate="loc_Email"></span>
            </label>
            <input id="emailAlta" name="emailInput" class="col-xs-6 customInput" type="text"
                   ng-model="gl.cliSelected.email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
        </div>

        <div class="form-group row col-xs-6">
            <label for="sexoAlta" class="col-xs-6 customLabel">Sexo</label>
            <select id="sexoAlta" name="sexoInput" ng-model="gl.cliSelected.sexo" class="col-xs-6">
                <option id="loc_Mujer" translate="loc_Mujer" value="M"></option>
                <option id="loc_Varon" translate="loc_Varon" value="V"></option>
            </select>
        </div>
        <div class="clearfix"></div>

    <%--USR_DATAS--%>
        <div class="form-group row col-xs-6" ng-repeat="ud in gl.cliSelected.usrDatas">
            <label name="usrDataLabel" class=" customLabel"
                   data-ng-class="{'customLabel':true, 'col-xs-offset-1 col-xs-5':$index%2!=0, 'col-xs-6':$index%2==0}"
                   data-ng-bind="ud.label"></label>
            <input name="usrDataInput" class="col-xs-6 customInput" type="text" ng-model="ud.value"/>
        </div>

        <div class="form-group row col-xs-12">
            <label id="loc_Condiciones" translate="loc_Condiciones" for="condicionesAlta" class="col-xs-3 customLabel"></label>
            <input id="condicionesAlta" name="condicionesInput" ng-model="gl.cliSelected.condiciones" class="col-xs-9 customInput" type="text">
        </div>
    </div>
</form>
<div id="container_box" class="container-fluid" ng-controller="clientesCtrl" style="display: none">
    <div id="spin_box" class="text-center"  data-ng-hide="!gl.loading">
        <%@include  file="/views/base/partialViews/spin-loading.jsp" %>
    </div>
        <div id="curtain" ng-hide="gl.loading" >
        <fieldset id="clientesPag_box" ng-disabled="gl.fondo == gl.ventanas.principal" ng-show="gl.actualView == gl.ventanas.principal" ng-controller="clientesPagCtrl">
            <div class="container-fluid row">
                <div id="buscarCliente_box" class="col-xs-12">
                    <div class="col-xs-12">
                        <%--<label id="loc_Cliente" for="clienteInput" class="col-xs-2 customLabel">Cliente</label>--%>
                        <div id="criterio_box" class="col-xs-2">
                            <select ng-model="criterio" ng-init="criterio = 'nombre'" ng-change="focusMe('clienteInput')" class="form-control">
                                <option id="loc_Nombre" translate="loc_Nombre" value="nombre" selected>Nombre</option>
                                <option id="loc_Tarjeta" translate="loc_Tarjeta" value="tarjeta" >Tarjeta</option>
                                <option translate="loc_Codigo" translate="loc_Codigo" value="codigo" >Codigo</option>
                                <option id="loc_DNI" translate="loc_DNI" value="dni">DNI</option>
                                <option id="loc_Email" translate="loc_Email" value="email">E-mail</option>
                                <option id="loc_Poblacion"  translate="loc_Poblacion" value="poblacion">Población</option>
                            </select>
                        </div>
                        <div id="buscarClienteInput_box" class="col-xs-6">
                            <input id="clienteInput" name="clienteInput" class="col-xs-9 customInput" type="search"
                                   ng-model="searchInput" ng-keyup="searchClient(searchInput, false)">
                            <a id="buscarCliente_btn" class="col-xs-2" href="#" ng-click="searchClient(searchInput)">
                                <img class="imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg">
                            </a>
                        </div>
                            <div class="col-xs-4">
                                <%@include  file="/views/client-dashboard/partialViews/btns/nuevoCliente-btn.jsp" %>
                            </div>
                    </div>
                </div>
                <div id="clientesPag" class="col-xs-10" >
                    <div class="col-xs-12 text-left">
                        <div tabindex="{{$index}}" class="col-xs-1 clientBox"
                             ng-repeat="cli in filteredData = ( dData = (data | filter:filters | startingLetter:startingLetter) | startFromGrid: currentPage * pageSize | limitTo: pageSize)"
                             ng-click="selectCliente($index)" ng-class="(gl.selectedIndex == $index) ? 'focusedClientBox' : 'noFocusedClientBox'">
                            <div>
                                <div class="azulCliente" ng-bind="cli.nombre.length > 18 ? cli.nombre.substr(0,17)+'...' : cli.nombre.substr(0,20)"></div>
                                <div class="grisCliente"><span translate="loc_Codigo"></span>:  <span ng-bind="cli.codigo"></span></div>
                                <div class="grisCliente"><span translate="loc_DNI"></span>:  <span ng-bind="cli.dni"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="clientesPagLetras_box" class="col-xs-2">
                    <div class="enlace_btn_box col-xs-5" ng-repeat="letra in letras" ng-class-odd="'text-right'" ng-class-even="'text-left'">
                        <a href="#" id="{{letra}}_btn" ng-click="searchClientByLetter(letra)">
                            <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/Btn_{{letra}}.gif" alt="">
                        </a>
                    </div>
                </div>
                <ms-pag-btns class="col-xs-10"></ms-pag-btns>
            </div>
        </fieldset>
        <fieldset id="newClienteFormulario_box" class="container blue-text"
                  ng-disabled="gl.fondo == gl.ventanas.formulario"
                  ng-show="gl.actualView == gl.ventanas.formulario || gl.fondo == gl.ventanas.formulario"
                  ng-class="gl.fondo == gl.ventanas.formulario && 'disabledClick'">
            <%@include  file="/views/client-dashboard/partialViews/alta-cliente-form.jsp" %>
        </fieldset>
        <fieldset id="vprCliente_box" class="container blue-text"
                  ng-disabled="gl.fondo == gl.ventanas.formulario" data-ng-show="gl.actualView == gl.ventanas.vpr || gl.fondo == gl.ventanas.vpr"
                  ng-class="gl.fondo == gl.ventanas.vpr && 'disabledClick'">
            <%@include  file="/views/client-dashboard/partialViews/vpr-cliente.jsp" %>
        </fieldset>
        <fieldset id="seleccion_box" class="container row main-box" ng-controller="seleccionCtrl" ng-disabled="gl.fondo == gl.ventanas.seleccion" ng-show="gl.actualView == gl.ventanas.seleccion" >
            <%@include  file="/views/base/partialViews/ventana-seleccion.jsp" %>
        </fieldset>
        <ms-auxiliar-mensaje model="gl"></ms-auxiliar-mensaje>
        <ms-auxiliar-articulo model="gl"></ms-auxiliar-articulo>
    </div>
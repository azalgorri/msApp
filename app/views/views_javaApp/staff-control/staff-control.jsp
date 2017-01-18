<div id="container_box" class="container-fluid" data-ng-controller="vendedoresCtrl" style="display: block">
    <div id="spin_box" class="text-center" data-ng-hide="!gl.loading">
        <%@include  file="/views/base/partialViews/spin-loading.jsp" %>
    </div>
    <%--<ms-spin-a data-ng-init="gl.loading=true"></ms-spin-a>--%>
    <div id="curtain" data-ng-hide="gl.loading" data-ng-controller="calendariosCtrl"  style="display: none">

        <fieldset id="staffControlPrincipal_box"
                  data-ng-disabled="gl.fondo == gl.ventanas.principal" data-ng-show="gl.actualView == gl.ventanas.principal">
            <div id="vendedores_box" class="col-xs-10 row">
                <div class="col-xs-2 vendedorDiv selectedVendedor" data-focus="false" href="#"
                     data-ng-class="{'focusedVendedor': isFocused($index)}"
                     data-ng-click="selectVendedor($index); addVendedor($index, $event);"
                     data-ng-repeat="ven in gl.data.vendedores">
                    <img data-ng-if="$index == 0" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoCarlota.jpg">
                    <img data-ng-if="$index == 1" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoHugo.jpg">
                    <img data-ng-if="$index == 2" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoJosefa.jpg">
                    <img data-ng-if="$index == 3" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoIker.jpg">
                    <div id="vendedoresDivSubFoto">
                        <div>
                            <div class="col-xs-2 vendedorColor_box">
                                <%--<div class="vendedorColor" data-ng-style="{'background-color': (ven.color ? '{{ven.color}}' : '#D2D2D2')}"></div>--%>
                                <div class="vendedorColor" data-ng-style="{'background-color': getVendedorColor(ven)}"></div>
                            </div>
                            <div class="col-xs-10 text-left">
                                <span data-ng-bind="ven.codigo"></span>
                            </div>
                        </div>
                        <div class="vendedorNombre_box">
                            <span class="col-xs-12" data-ng-bind="ven.nombre + ' ' + ven.apellido1.charAt(0) + '.'"></span>
                        </div>
                        <div class="vendedorMas" style="z-index: 5">
                            <img src="${pageContext.request.contextPath}/images/icons/mas.png" data-ng-click="editarFicha(gl.vendedor)">
                        </div>
                    </div>
                </div>
            </div>
            <div id="calendario_box" class="col-xs-12">

                <div class="customNavBar">
                    <div class="btn-group" data-ng-model="gl.scopes.calendarios.currentTab" bs-radio-group>
                        <label class="btn btn-default active"
                            data-ng-click="gl.scopes.calendarios.currentTab = 0; changeCalendar('calendar1')">
                            <input type="radio" class="btn btn-default" value="0">
                            <span translate="loc_Horarios"></span>
                        </label>
                        <label class="btn btn-default"
                               data-ng-click="gl.scopes.calendarios.currentTab = 1; changeCalendar('calendar2')">
                            <input type="radio" class="btn btn-default" value="1">
                            <span translate="loc_Vacaciones"></span>
                        </label>
                    </div>
                </div>

                <div id="calendar1_box" data-ng-show="gl.scopes.calendarios.currentTab == 0">
                    <div id="calendar1" class="calendar" data-ng-model="eventSources1"
                         calendar="calendar1"
                         config="uiConfig.calendar1"
                         ui-calendar="uiConfig.calendar1">
                    </div>
                </div>
                <div id="calendar2_box" data-ng-show="gl.scopes.calendarios.currentTab == 1">
                    <div id="calendar2" class="calendar" data-ng-model="eventSources2"
                         calendar="calendar2"
                         config="uiConfig.calendar2"
                         ui-calendar="uiConfig.calendar2">
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset id="staffControlFormulario_box"
                  ng-disabled="gl.fondo == gl.ventanas.formulario"
                  ng-show="gl.actualView == gl.ventanas.formulario || gl.fondo == gl.ventanas.formulario">
            <div id="datosVendedor_box" class="col-xs-9">
                <div id="fotoVendedor_box" class="col-xs-3">
                    <%--<img class="img-responsive" src="${pageContext.request.contextPath}/images/staff-control/no-user.png">--%>
                    <img data-ng-if="gl.vendedor.id == 128" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoCarlota.jpg">
                    <img data-ng-if="gl.vendedor.id == 129" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoHugo.jpg">
                    <img data-ng-if="gl.vendedor.id == 130" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoJosefa.jpg">
                    <img data-ng-if="gl.vendedor.id == 131" class="img-responsive center-block imagenGrid" src="${pageContext.request.contextPath}/images/staff-control/fotoIker.jpg">
                    <br/>
                    <div id="addDeleteImg_box" class="sinpadding" hidden>
                        <div class="col-xs-6 text-right">
                            <button id="deleteImg_btn" type="button" class="btn btn-default">
                                <span class="glyphicon glyphicon-minus"></span>
                            </button>
                        </div>
                        <div class="col-xs-6 text-left">
                            <button id="addImg_btn" type="button" class="btn btn-default">
                                <span class="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>
                        <input type="file" id="imgVen"  name="viewModels.img" style="display:none" />
                    </div>
                    <script>
                        $('#deleteImg_btn').on('click', function () {
                            // TO-DO
                        });
                        $("#addImg_btn").on('click', function () {
                            $("#imgVen").trigger('click');
                        });
                    </script>
                </div>
                <s:form id="newVendedor_form">
                    <div id="datos1_box" class="col-xs-9 blue-text sinpadding">
                        <div class="form-group row">
                            <label for="nombreVen" class="col-xs-3 customLabel">Nombre</label>
                            <input id="nombreVen" name="nombreInput" class="col-xs-9 customInput" type="text"
                                   data-ng-model="gl.vendedor.nombre">
                        </div>
                        <div class="form-group row">
                            <label class="col-xs-3 customLabel">Apellidos</label>
                            <input id="apellido1Ven" name="apellidosInput" class="col-xs-4 customInput" type="text"
                                   data-ng-model="gl.vendedor.apellido1">
                            <input id="apellido2Ven" name="apellidosInput" class="col-xs-offset-1 col-xs-4 customInput" type="text"
                                   data-ng-model="gl.vendedor.apellido2">
                        </div>
                        <div class="form-group row">
                            <label for="dniVen" class="col-xs-3 customLabel">DNI</label>
                            <input id="dniVen" name="dniInput" class="col-xs-9 customInput" type="text"
                                   data-ng-model="gl.vendedor.dni">
                        </div>
                        <div class="form-group row">
                            <label for="calleVen" class="col-xs-3 customLabel">Calle</label>
                            <input id="calleVen" name="calleInput" class="col-xs-9 customInput" type="text"
                                   data-ng-model="gl.vendedor.calle">
                        </div>
                        <div class="form-group row">
                            <label for="cpVen" class="col-xs-3 customLabel">C.P.</label>
                            <input id="cpVen" name="cpInput" class="col-xs-9 customInput" type="text"
                                   data-ng-model="gl.vendedor.cp">
                        </div>
                        <div class="form-group row">
                            <label for="poblacionVen" class="col-xs-3 customLabel">Poblaci�n</label>
                            <input id="poblacionVen" name="poblacionInput" class="col-xs-9 customInput" type="text"
                                   data-ng-model="gl.vendedor.poblacion">
                        </div>
                        <div ng-controller="seleccionCtrl">
                            <div class="form-group row">
                                <label for="estadoVen" class="col-xs-3 customLabel">Estado</label>
                                <input id="estadoVen" name="estadoInput" class="col-xs-5 customInput" type="text"
                                       data-ng-model="gl.vendedor.estado.codigo">
                                <a id="buscarEstado_btn" name="buscarEstado_btn" class="col-xs-1"href="#">
                                    <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg"
                                         ng-click="buscarEstados()">
                                </a>
                                <div id="estadoVenInfo" class="col-xs-3 estado infoInput"><p data-ng-bind="gl.vendedor.estado.nombre"></p></div>
                            </div>
                            <div class="form-group row"  data-ng-if="gl.vendedor && gl.vendedor.estado">
                                <label for="provinciaVen" class="col-xs-3 customLabel">Provincia</label>
                                <input id="provinciaVen" name="provinciaInput" class="col-xs-5 customInput" type="text"
                                       data-ng-model="gl.vendedor.provincia.codigo">
                                <a id="buscarProvincia_btn" name="buscarProvincia_btn" class="col-xs-1"href="#">
                                    <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg"
                                         ng-click="buscarPovincias()">
                                </a>
                                <div id="provinciaVenInfo" class="col-xs-3 provincia infoInput"><p data-ng-bind="gl.vendedor.provincia.nombre"></p></div>
                            </div>
                        </div>
                    </div>
                    <div id="datos2_box" class="col-xs-12 blue-text sinpadding">
                        <div>
                            <div class="form-group col-xs-12 " data-ng-controller="seleccionCtrl">
                                <label class="col-xs-3 customLabel">Color: </label>
                                <ms-colorpicker colors="gl.colorsInPicker" model="gl.vendedor"></ms-colorpicker>
                            </div>
                        </div>
                        <div class="form-group col-xs-6 sinpadding">
                            <label for="tfnVen" class="col-xs-6 customLabel">Tel�fono</label>
                            <input id="tfnVen" name="tfnInput" class="col-xs-6 customInput" type="text"
                                   data-ng-model="gl.vendedor.telef1">
                        </div>
                        <div class="form-group col-xs-6">
                            <label for="tfnMovilVen" class="col-xs-offset-1 col-xs-5 customLabel">Movil</label>
                            <input id="tfnMovilVen" name="tfnMovilInput" class="col-xs-6 customInput" type="text"
                                   data-ng-model="gl.vendedor.telefMovil">
                        </div>
                        <div>
                            <div class="form-group col-xs-6">
                                <label for="lenguaVen" class="col-xs-6 customLabel">Lengua</label>
                                <input id="lenguaVen" name="lenguaInput" class="col-xs-6 customInput" type="text"
                                       data-ng-model="gl.vendedor.lengua">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-6">
                                <label for="codigoVen" class="col-xs-offset-1 col-xs-5 customLabel">C�digo</label>
                                <input id="codigoVen" name="codigoInput" class="col-xs-6 customInput" type="text" readonly
                                       data-ng-model="gl.vendedor.codigo">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="nssVen" class="col-xs-3 customLabel">N� S.S.</label>
                                <input id="nssVen" name="nssInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.nss">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="emailVen" class="col-xs-3 customLabel">Email</label>
                                <input id="emailVen" name="emailInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.email1">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="facebookVen" class="col-xs-3 customLabel">Facebook</label>
                                <input id="facebookVen" name="facebookInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.facebook">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="twitterVen" class="col-xs-3 customLabel">Twitter</label>
                                <input id="twitterVen" name="twitterInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.twitter">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="aficionesVen" class="col-xs-3 customLabel">Aficiones</label>
                                <input id="aficionesVen" name="aficionesInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.aficiones">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="otrosTrabajosVen" class="col-xs-3 customLabel">Otros Trabajos</label>
                                <input id="otrosTrabajosVen" name="otrosTrabajosInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.otrosTrabajos">
                            </div>
                        </div>
                        <div>
                            <div class="form-group col-xs-12">
                                <label for="aptitudesVen" class="col-xs-3 customLabel">Aptitudes</label>
                                <input id="aptitudesVen" name="aptitudesInput" class="col-xs-9 customInput" type="text"
                                       data-ng-model="gl.vendedor.aptitudes">
                            </div>
                        </div>
                        <div id="observaciones_box col-xs-12">
                            <label for="observacionesVen" class="col-xs-3 customLabel">Observaciones</label>
                            <div class="col-xs-9">
                                <textarea type="text" id="observacionesVen" name="observacionesInput"
                                          rows="5" cols="60" class="col-xs-12 customInput"
                                          data-ng-model="gl.vendedor.observaciones"></textarea>
                            </div>
                        </div>
                    </div>
                </s:form>
            </div>
            <div id="vendedorBtns_box" class="col-xs-offset-1 col-xs-2">
                <%@include  file="/views/staff-control/partialViews/btns/horarioLaboral-btn.jsp" %>
                <%@include  file="/views/staff-control/partialViews/btns/diarioLaboral-btn.jsp" %>
                <%@include  file="/views/staff-control/partialViews/btns/historialLaboral-btn.jsp" %>
                <%@include  file="/views/staff-control/partialViews/btns/venta-btn.jsp" %>
            </div>
        </fieldset>
        <fieldset id="seleccion_box" class="container row main-box" ng-controller="seleccionCtrl" ng-disabled="gl.fondo == gl.ventanas.seleccion" ng-show="gl.actualView == gl.ventanas.seleccion" >
            <%@include  file="/views/base/partialViews/ventana-seleccion.jsp" %>
        </fieldset>
        <ms-auxiliar-mensaje model="gl"></ms-auxiliar-mensaje>
        <ms-auxiliar-fichajes model="gl"></ms-auxiliar-fichajes>
        <ms-auxiliar-horario model="gl"></ms-auxiliar-horario>
    </div>





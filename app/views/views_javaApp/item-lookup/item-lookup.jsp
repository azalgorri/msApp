<%@ taglib uri="/struts-tags" prefix="s"%>

    <div class="container-fluid">

        <div id="itemLookupPrincipal_box" class="main-box"  style="display: block">
                <%--FOTOS--%>
                <div id="fotos_box" class="col-xs-4 sinpadding row box">
                    <%--Foto principal--%>
                    <div id="foto_principal" class="col-xs-12 reset"></div>
                    <%--Miniaturas--%>
                    <div id="foto_miniaturas" class="col-xs-12 reset"></div>
                    <%--Script para el control de las imagenes--%>
                    <script src="${pageContext.request.contextPath}/js/modules/item-lookup/custom-swipe.js"></script>
                </div>
                <%--BÚSQUEDA/PRECIO/COLORES/DESCRIPCION--%>
                <div id="detallesArtic_box" class="col-xs-8  box">
                    <%--BÚSQUEDA/IDIOMAS--%>
                    <div class="col-xs-12 row">
                        <div class="col-xs-9">
                            <%--BÚSQUEDA--%>
                            <div id="busqueda_box">
                                <div class="col-xs-4">
                                    <select id="filtroCampo" name="viewModels.filtro.campo" class="selectpicker col-xs-12" data-style="btn-inverse">
                                        <option id="loc_Localizador" name="loc_Localizador" value="localizador" class="customOption"></option>
                                        <option id="loc_Modelo" name="loc_Modelo" value="modelo" class="customOption"></option>
                                        <option id="loc_Descripcion" name="loc_Descripcion" value="descripcion" class="customOption"></option>
                                        <option id="loc_Referencia" name="loc_Referencia" value="referencia" class="customOption"></option>
                                    </select>
                                </div>
                                <div class="col-xs-8">
                                    <div class="input-group">
                                        <input type="text" id="filtroValor" class="form-control" name="viewModels.filtro.valor" placeholder="" required>
                                    <span class="input-group-btn">
                                        <button id="filtrarBtn" class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>
                                    </span>
                                    </div>
                                </div>
                            </div>
                                <%--LOCALIZADOR/MODELO--%>
                                <div id="localizador_box" class="text-left row">
                                    <div id="localizadorArtic" class="reset"></div>
                                    <div id="modeloArtic" class="reset"></div>
                                </div>
                        </div>
                        <%--BOTONES DE BÚSQUEDA--%>
                        <div id="botonesBusqueda_box" class="col-xs-3 text-right row">
                            <%@include  file="/views/item-lookup/partialViews/btns/porReferencia-btn.jsp" %>
                            <%@include  file="/views/item-lookup/partialViews/btns/porTalla-btn.jsp" %>
                            <%@include  file="/views/item-lookup/partialViews/btns/porTallaReferencia-btn.jsp" %>
                        </div>
                    </div>
                    <%--COLORES--%>
                        <div class="col-xs-12">
                            <div id="colores_box" class="col-xs-offset-1 col-xs-11 row reset"></div>
                        </div>
                    <%--DESCRIPCIÓN--%>
                    <div id="descripcion_box" hidden>
                        <%--<ul id="navDescripcion" class="nav nav-tabs"></ul>--%>
                        <h4 id="navDescripcion" class="col-xs-12 customH4"></h4>
                        <br/>
                        <div class="col-xs-9">
                            <div id="descripcionArtic" class="reset"></div>
                            <div id="composicionArtic" class="reset"></div>
                            <div id="composicionForroArtic" class="reset"></div>
                            <div id="imgCuidados" class="reset"></div>
                        </div>

                            <div>
                                <div id="idiomaDesc_box" class="col-xs-3 row" hidden>
                                    <select id="idiomaDesc" class="col-xs-5"></select>
                                </div>
                            </div>
                    </div>
                </div>
                <%--TABLA/SIMILARES/MEDIDAS--%>
                <div id="restoArtic_box" class="col-xs-12 box row" style="background-color: transparent; display: none">
                    <%--TABLA--%>
                    <h4 id="tabla_box_titulo" class="col-xs-12 customH4 reset"></h4>
                    <div id="tabla_box" class="col-xs-10 reset" ></div>
                    <%--BOTÓN DE RESERVA--%>
                    <div id="reserva_btn_box" class="col-xs-2" hidden>
                        <div class="enlace_btn_box btn_extra" >
                            <a id="reservarTalla_btn" href="#">
                                <img src="${pageContext.request.contextPath}/images/item-lookup/Btn_Reservar.gif">
                            </a>
                        </div>
                    </div>
                    <%--ARTÍCULOS SIMILARES--%>
                    <h4 id="similares_box_titulo" class="col-xs-12 customH4 reset displayNone" style="display: none;"></h4>
                    <div id="similares_box" class="col-xs-10 row reset displayNone" style="display: none;"></div>
                    <%--MEDIDAS--%>
                    <h4 id="medidas_box_titulo" class="col-xs-12 customH4 reset displayNone" style="display: none;"></h4>
                    <div id="medidas_box" class="col-xs-10 row reset displayNone" style="display: none;"></div>
                </div>
        </div>
        <div id="itemLookupSeleccion_box" data-type="seleccion-articulo" class="container main-box" style="display: none">
            <div class="row">
                <div class="col-xs-offset-1 col-xs-7">
                    <div id="explicacion_tabla">
                        <h2 id="loc_SelecArticulo" name="loc_SelecArticulo"></h2>
                        <p id="loc_SelecArticuloExp" name="loc_SelecArticuloExp"></p>
                    </div>
                    <br/>
                    <div id="tabla_seleccion_box">
                        <%--TABLA SELECCIÓN--%>
                        <div id="tabla_seleccion" class="table-responsive tabla_hover">
                            <table class="table">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div id="foto_seleccion" class="reset"></div>
                    <div id="btns_seleccion">
                        <%@include  file="/views/item-lookup/partialViews/btns/pagSiguiente-btn.jsp" %>
                    </div>
                </div>
            </div>
        </div>
        <div id="itemLookupAuxiliar_box" class="container blue-text row main-box" style="display: none">
                <div id="tallaReferenciaInput_box" class="col-xs-offset-1 col-xs-11 auxDiv" hidden>
                    <div class="porTalla porTallaReferencia">
                        <p id="selectCliente_ajax" class="porTalla"></p>
                        <p id="loc_BuscarPorTallaRef" name="loc_BuscarPorTallaRef" class="porTallaReferencia"></p>
                    </div>
                    <div id="referenciaInput_box" class="col-xs-10 porTallaReferencia">
                        <label id="loc_Referencia2" name="loc_Referencia" for="referenciaInput" class="col-xs-2 porTallaReferencia blue-text customLabel"></label>
                        <input id="referenciaInput" name="referenciaInput" class="col-xs-9 porTallaReferencia customInput" type="text" required>
                    </div>
                    <div id="tallaInput_box" class="col-xs-10 porTalla porTallaReferencia">
                        <label id="loc_Talla" name="loc_Talla" for="tallaInput" class="col-xs-2 porTalla porTallaReferencia blue-text customLabel"></label>
                        <input id="tallaInput" name="tallaInput" class="col-xs-9 porTalla porTallaReferencia customInput" type="text" required>
                    </div>
                </div>
                <div id="reservarInput_box" class="col-xs-offset-1 col-xs-11 auxDiv" hidden>

                        <div class="col-xs-12">
                            <%@include  file="/views/base/partialViews/buscar-cliente.jsp" %>
                        </div>

                        <div class="col-xs-12">
                            <%@include  file="/views/base/partialViews/buscar-vendedor.jsp" %>
                        </div>

                        <div class="col-xs-12">
                            <label id="loc_TiendaSalida" name="loc_TiendaSalida" for="tiendaSalidaInput" class="col-xs-3 blue-text customLabel"></label>
                            <input id="tiendaSalidaInput" name="tiendaSalidaInput" class="col-xs-4 customInput" type="text" disabled readonly>
                            <div id="tiendaSalidaInfo" class="col-xs-4 text-right infoInput"><p></p></div>
                        </div>

                        <div class="col-xs-12">
                            <label id="loc_Talla2" name="loc_Talla" for="tallaInput2" class="col-xs-3 blue-text customLabel"></label>
                            <input id="tallaInput2" name="tallaInput" class="col-xs-4 customInput" type="text" disabled readonly>
                        </div>

                        <div class="col-xs-12">
                            <label id="loc_Unidades" name="loc_Unidades" for="unidadesInput" class="col-xs-3 blue-text customLabel"></label>
                            <input id="unidadesInput" name="unidadesInput" class="col-xs-4 customInput" type="text" disabled readonly>
                        </div>

                        <div class="col-xs-12">
                            <label id="loc_Precio" name="loc_Precio" for="precioInput" class="col-xs-3 blue-text customLabel"></label>
                            <input id="precioInput" name="precioInput" class="col-xs-4 customInput" type="text" disabled readonly>
                        </div>
                </div>
                <div id="errores_box" class="col-xs-offset-1 col-xs-11 auxDiv" hidden><p></p></div>
        </div>
        <div id="itemLookupFormulario_box" class="container blue-text main-box" style="display: none">
            <%@include  file="/views/client-dashboard/partialViews/alta-cliente-form.jsp" %>
        </div>

<div>
    <div class="row">
        <div class="col-xs-offset-1" ng-class="{'col-xs-7' : (sel.foto)}">
            <div id="explicacion_tabla" ng-switch="sel.entity">
                    <%--Estado--%>
                <h2 id="loc_SelecEstado" translate="loc_SelecEstado" ng-switch-when="estado"></h2>
                <p id="loc_SelecEstadoExp" translate="loc_SelecEstadoExp" ng-switch-when="estado"></p>
                    <%--Provincia--%>
                <h2 id="loc_SelecProvincia" translate="loc_SelecProvincia" ng-switch-when="provincia"></h2>
                <p id="loc_SelecProvinciaExp" translate="loc_SelecProvinciaExp" ng-switch-when="provincia"></p>
                        <%--Cliente--%>
                        <h2 id="loc_SelecCliente" translate="loc_SelecCliente" ng-switch-when="cliente"></h2>
                        <p id="loc_SelecClienteExp" translate="loc_SelecClienteExp" ng-switch-when="cliente"></p>
            </div>
            <br/>
            <div id="tabla_seleccion_box">
                <%--TABLA SELECCIÓN--%>
                <div id="tabla_seleccion" class="table-responsive tabla_hover">
                    <%@include  file="/views/base/partialViews/tablas-seleccion.jsp" %>
                </div>
            </div>
        </div>
        <div id="foto_box" class="col-xs-4" ng-if="sel.foto">
            <div id="foto_seleccion" class="reset"></div>
            <div id="btns_seleccion">
                <%@include  file="/views/item-lookup/partialViews/btns/pagSiguiente-btn.jsp" %>
            </div>
        </div>
        <br/><br/>
        <div id="clientesPagBtns_box" class="col-xs-4-offset" ng-if="sel.paginacion">
            <!-- Navegar hacia atrás -->
            <div id="anteriores_btn" class="col-xs-6 text-right" ng-disabled='sel.currentPage == 0' ng-click='sel.currentPage = sel.currentPage - 1'
                 ng-class="sel.currentPage == 0 && 'disabledClick'">
                <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_ant.png" alt="">
            </div>
            <!-- Navegar a una página especifica-->
            <div id="siguientes_btn" class="col-xs-6 text-left" ng-disabled='sel.currentPage >= data.length/sel.pageSize - 1' ng-click='sel.currentPage = sel.currentPage + 1'
                 ng-class="sel.currentPage >= data.length/sel.pageSize - 1 && 'disabledClick'">
                <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_sig.png" alt="">
            </div>
        </div>
    </div>
    <div class="footer_space col-xs-12"><br/><br/><br/><br/></div>
</div>

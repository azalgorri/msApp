<%@ taglib prefix="s" uri="/struts-tags" %>
<div id="loginPrincipal_box">
    <s:form id="loginForm" action="login" method="POST">
        <div class="col-xs-offset-2 col-xs-10">
            <div class="col-xs-9">
                <div class="form-group">
                    <label id="loc_Tienda2" for="tiendaLogin" class="col-xs-3 customLabel blue-text"></label>
                    <input id="tiendaLogin" name="tiendaInput" class="col-xs-4 customInput" type="text">
                    <a id="buscarTienda_btn" name="buscarTienda_btn" class="col-xs-1" href="#">
                        <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg">
                    </a>
                </div>
                <div id="tiendaLoginInfo" name="tiendaInfo" class="col-xs-4 tienda infoInput"><p></p></div>
            </div>
            
            <div class="col-xs-9">
                <div class="form-group">
                    <label id="loc_Vendedor" for="vendedorLogin" class="col-xs-3 customLabel blue-text"></label>
                    <input id="vendedorLogin" name="vendedorInput" class="col-xs-4 customInput" type="text" disabled/>
                    <a id="buscarVendedor_btn" name="buscarVendedor_btn" class="col-xs-1" href="#" hidden>
                        <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg">
                    </a>
                </div>
                <div id="vendedorLoginInfo" name="vendedorInfo" class="col-xs-4 vendedor infoInput"><p></p></div>
            </div>
            
            <div class="col-xs-9">
                <div class="form-group">
                    <label id="loc_Clave" for="claveLogin" class="col-xs-3 customLabel blue-text"></label>
                    <input id="claveLogin" name="claveInput" class="col-xs-4 customInput" type="password" disabled>
                </div>
            </div>
            
            <div id="aceptarBtn_box" class="col-xs-offset-3 col-xs-2">
                <%--<button id="loc_Acceder" type="submit" class="btn btn-default" disabled></button>--%>
                <button type="submit" id="aceptar_btn" disabled>
                    <img class="img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_aceptar.gif" alt="">
                </button>
            </div>
        </div>
    </s:form>
</div>
<div id="loginSeleccion_box" data-type="seleccion-tienda" class="container" hidden>
    <div class="row">
        <div class="col-xs-offset-1 col-xs-7">
            <div id="explicacion_tabla">
                <h2 id="loc_SelecTienda"></h2>
                <p id="loc_SelecTiendaExp"></p>
            </div>
            
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
            <%--<div id="foto_seleccion" class="reset"></div>--%>
            <div id="btns_seleccion">
                <%@include  file="/views/item-lookup/partialViews/btns/pagSiguiente-btn.jsp" %>
            </div>
        </div>
    </div>
    <div class="footer_space col-xs-12"><br/><br/><br/><br/></div>
</div>

<%@ page import="java.util.Properties" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div id="cabecera">
    <div id="cabecera_box">
        <%--IDIOMAS--%>
        <div id="idiomas_box" class="col-xs-offset-8 col-xs-1 text-right"></div>
        <div id="datos_cliente_box" class="col-xs-3 row">
            <div id="contenedor_datos_cabecera" class="col-xs-offset-3 col-xs-9">
                <div class="datos_cliente">
                    <label id="loc_Tienda" name="loc_Tienda">Tienda</label>:&nbsp;&nbsp;<span id="tienda"><s:property value="viewModels.op.cliCode" /></span>
                </div>
                <div class="datos_cliente">
                    <label id="loc_Cliente" name="loc_Cliente">Cliente</label>:&nbsp;&nbsp;<span id="cliente"><s:property value="viewModels.op.nombreTienda.substring(0, 8)" /></span>
                </div>
                <div class="datos_cliente">
                    <span id="aplicacion" style="font-weight: bold">EON Mobile Store</span>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="cuerpo">

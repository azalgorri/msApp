<%@ page import="data.appEntities.Articulo.Articulo" %>
<%@ taglib uri="/struts-tags" prefix="s"%>

    <div id="seleccion_articulo_box" class="container" hidden>
        <%--ACCIONES--%>
        <s:url action="search-by.action" var="selectArticulo_Action" />
        <div class="row">
            <div class="col-xs-8">
                <div>
                    <h2>Selección de artículo</h2>
                    <p>El código que ha tecleado puede corresponder a varios artículos. Seleccione en la lista que tiene a continuación cuál de ellos es el que desea utilizar.</p>
                    <br/>
                <%--TABLA MODAL--%>
                    <div id="tabla_seleccion" class="table-responsive tabla_hover">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Artículo</th>
                                    <th>Referencia</th>
                                    <th>Temporada</th>
                                    <th>Color</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
                <div id="foto_seleccion">
                    <img class="img-responsive center-block imagenGrid"
                         src="http://localhost:8282/TwisterWeb/ServletImg?artic=<s:property value="%{viewModels.seleccionado.id}"/>&wmin=400&hmin=400&index=<s:property value="%{#index}"/>"
                         data-zoom-image="http://localhost:8282/TwisterWeb/ServletImg?artic=<s:property value="%{viewModels.seleccionado.id}"/>&wmin=800&hmin=800&index=<s:property value="%{#index}"/>"
                         alt="">
                </div>
            </div>
        </div>
        <div class="footer_space col-xs-12"><br/><br/><br/><br/></div>
            <%--Campo oculto para la selección del artículo de la tabla--%>
            <s:form id="seleccionado_form" action="%{#selectArticulo_Action}">
                <s:hidden id="seleccionado" name="viewModels.seleccionado" value=""/>
            </s:form>
    </div>


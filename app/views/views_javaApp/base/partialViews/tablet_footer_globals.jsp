<%@ taglib prefix="s" uri="/struts-tags" %>
<div id="footer" data-ng-controller="footerCtrl" data-ng-keypress="($event.which === 113) && controlKey($event)"
data-ng-class="{'zIndexUp': gl.actualView == gl.ventanas.principal}">
    <div id="escape_box" class="col-xs-3">
        <%@include  file="/views/base/partialViews/btns/salir-btn.jsp" %>
    </div>
    <div id="restoBtn_box" class="col-xs-9" >
        <%@include  file="/views/base/partialViews/btns/seleccionar-btn.jsp" %>
        <%@include  file="/views/base/partialViews/btns/continuar-btn.jsp" %>
        <%@include  file="/views/item-lookup/partialViews/btns/reservar-btn.jsp" %>
        <%@include  file="/views/client-dashboard/partialViews/btns/grabarCliente-btn.jsp" %>
        <%@include  file="/views/client-dashboard/partialViews/btns/borrarCliente-btn.jsp" %>
        <%@include  file="/views/client-dashboard/partialViews/btns/ventasCliente-btn.jsp" %>
        <%@include  file="/views/client-dashboard/partialViews/btns/prestamosCliente-btn.jsp" %>
        <%@include  file="/views/client-dashboard/partialViews/btns/reservasCliente-btn.jsp" %>
        <%@include  file="/views/staff-control/partialViews/btns/grabarVendedor-btn.jsp" %>
        <%@include  file="/views/base/partialViews/btns/aceptar-btn.jsp" %>
    </div>
</div>
<%--final del contenedor--%>
</div>
</body>

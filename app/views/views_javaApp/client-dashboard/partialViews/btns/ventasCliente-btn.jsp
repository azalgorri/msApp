<div id="ventasCliente_btn" name="ventas" class="pull-left enlace_btn_box" data-ng-click="gl.scopes.clientes.completeObj($event)"
     ng-style="isActive('ventasCliente_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span class="nombre_opcion" translate="loc_Ventas"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F1.png" alt="">
    </a>
</div>
<div id="prestamosCliente_btn" name="prestamos" class="pull-left enlace_btn_box" data-ng-click="gl.scopes.clientes.completeObj($event)"
     ng-style="isActive('prestamosCliente_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span class="nombre_opcion" translate="loc_Prestamos"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F2.png" alt="">
    </a>
</div>
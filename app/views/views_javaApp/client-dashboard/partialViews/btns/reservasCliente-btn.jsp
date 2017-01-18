<div id="reservasCliente_btn" name="reservas" class="pull-left enlace_btn_box" data-ng-click="gl.scopes.clientes.completeObj($event)"
     ng-style="isActive('reservasCliente_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span class="nombre_opcion" translate="loc_Reservas"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F3.png" alt="">
    </a>
</div>
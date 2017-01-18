<div id="borrarCliente_btn" name="borrarCliente_btn" class="pull-right enlace_btn_box" data-ng-click="confirmar($event)"
     data-ng-style="isActive('borrarCliente_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span class="nombre_opcion" translate="loc_BorrarCliente"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F4.png" alt="">
    </a>
</div>
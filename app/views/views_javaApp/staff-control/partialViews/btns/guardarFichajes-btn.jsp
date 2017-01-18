<div id="guardarFichajes_btn" class="pull-right enlace_btn_box"
     data-ng-click="gl.scopes.fichajes.saveNewFichaje(gl.scopes.fichajes.newFic);"
     data-ng-style="isActive('guardarFichajes_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span translate="loc_Guardar"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F8.png" alt="">
    </a>
</div>
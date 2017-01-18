<div id="aniadirFichaje_btn" class="pull-right enlace_btn_box"
     data-ng-click="gl.scopes.fichajes.newFichaje = !gl.scopes.fichajes.newFichaje"
     data-ng-style="isActive('aniadirFichaje_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span translate="loc_AniadirFichaje"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_F7.png" alt="">
    </a>
</div>
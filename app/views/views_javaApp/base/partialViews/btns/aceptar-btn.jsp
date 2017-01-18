<div id="ok_btn" class="pull-right enlace_btn_box" ng-click="funcWaiting()"
     ng-style="isActive('ok_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span translate="loc_Aceptar" class="nombre_opcion"></span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_INTRO.gif" alt="">
    </a>
</div>
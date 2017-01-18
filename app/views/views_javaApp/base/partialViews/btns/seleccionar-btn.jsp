<div id="seleccionar_btn" class="pull-right enlace_btn_box" ng-click="seleccionar()"
     ng-style="isActive('seleccionar_btn') && {display: 'block'} || {display: 'none'}" style="display: none">
    <a href="#" onclick="event.preventDefault();">
        <span class="nombre_opcion">Seleccionar&nbsp;&nbsp;</span>
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_INTRO.gif" alt="">
    </a>
</div>
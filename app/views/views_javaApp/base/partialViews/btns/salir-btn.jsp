<div id="salir_btn" class="enlace_btn_box"
     data-ng-if="isActive('salir_btn')"
     data-ng-click="salir()">
    <a href="#" onclick="event.preventDefault();">
        <img class="imagen_btn img-responsive" src="${pageContext.request.contextPath}/images/base/Btn_ESC.gif" alt="">
        <span class="nombre_opcion">Salir</span>
    </a>
</div>
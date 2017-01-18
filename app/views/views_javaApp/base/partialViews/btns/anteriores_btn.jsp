<!-- Navegar hacia atrás -->
<div name="anteriores_btn" ng-class="currentPage == 0 && 'disabledBtn'">
    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_ant.png" alt="" ng-click='currentPage = currentPage - 1'>
</div>
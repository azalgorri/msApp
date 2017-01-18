<!-- Navegar hacia atrás -->
<div id="anteriores_btn" class="col-xs-6 text-right" ng-click='currentPage = currentPage - 1'
     ng-class="currentPage == 0 && 'disabledClick'">
    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_ant.png" alt="">
</div>
<!-- Navegar a una página especifica-->
<div id="siguientes_btn" class="col-xs-6 text-left" ng-click='currentPage = currentPage + 1'
     ng-class="currentPage >= data.length/pageSize - 1 && 'disabledClick'">
    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_sig.png" alt="">
</div>

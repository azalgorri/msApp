<!-- Navegar hacia adelante-->
<div name="siguientes_btn" ng-class="currentPage >= data.length/pageSize - 1 && 'disabledBtn'">
    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/boton_mostrar_sig.png" alt="" ng-click='currentPage = currentPage + 1'>
</div>
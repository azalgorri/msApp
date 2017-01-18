<label id="loc_Cliente" name="loc_Cliente" for="clienteInput" class="col-xs-3 blue-text customLabel">Cliente</label>
<input id="clienteInput" name="clienteInput" class="col-xs-4 customInput" type="text" style="display: block;" required
       ng-model="sel.searchInput" ng-keyup="$event.keyCode == 13 ? buscarClientes() : null">
<a id="buscarCliente_btn" class="col-xs-1" href="#" ng-click="buscarClientes()">
    <img class="img-responsive imagen_btn lupa" src="${pageContext.request.contextPath}/images/base/Lupa.jpg">
</a>
<div id="clienteInfo" name="clienteInfo" class="col-xs-3 text-left cliente infoInput" ng-bind="gl.cliSelected.nombre"></div>

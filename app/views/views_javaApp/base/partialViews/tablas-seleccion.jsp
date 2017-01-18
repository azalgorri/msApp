<table class="table">
    <thead>
        <tr>
            <td ng-repeat="col in sel.theadCols" ng-bind="col"></td>
        </tr>
    </thead>
    <tbody ng-switch="sel.selectType">
        <%--Estado / Provincia--%>
        <tr ng-switch-when="estadoProvincia"
            ng-repeat="row in  sel.filteredData = (sel.tbodyRows | seleccionFilter:sel.codigoEntity:sel.entity)"
            ng-click="sel.selectRow($index, $event)" ng-class="{'row_active':sel.rowIndex == $index}">
            <td ng-bind="row.codigo"></td>
            <td ng-bind="row.nombre"></td>
        </tr>
        <%--Ventas_Cliente / Préstamos_Cliente--%>
        <tr ng-switch-when="cliente"
            ng-repeat="cli in sel.filteredData = ( gl.data | seleccionFilter:sel.searchInput:sel.entity | startFromGrid: sel.currentPage * sel.pageSize | limitTo: sel.pageSize) track by cli.id"
            ng-click="sel.selectRow($index, $event)" ng-class="{'row_active':sel.rowIndex == $index}" ng-keyup="$event.keyCode == 13 ? selectCliente($index) : null">
            <td ng-bind="cli.codigo"></td>
            <td ng-bind="cli.nombre"></td>
            <td ng-bind="cli.nombre"></td>
        </tr>

    </tbody>
</table>
<div id="vpr_box" data-ng-controller="vprPagCtrl">
    <div class="col-xs-12">
        <span class="col-xs-8 yellow-text" data-ng-bind="gl.cliSelected.nombre"></span>
    </div>
    <br/><br/>
    <ms-desde-hasta class="col-xs-12"></ms-desde-hasta>
    <br/><br/>
    <div class="relative col-xs-11">
        <table class="table tabla_hover">
            <thead>
            <tr>
                <td data-ng-repeat="col in theadCols" data-ng-bind="col"></td>
            </tr>
            </thead>
                <tbody>
                    <tr data-ng-repeat="obj in filteredData = ( data | startFromGrid: currentPage * pageSize | limitTo: pageSize)"
                        data-ng-click="showArticuloDialog(obj.articTwId)">
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.fecha | date:'dd-MM-yyyy'"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.fechaCreacion | date:'dd-MM-yyyy'"></td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.vendedor"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.vendedorId"></td>
                        <td>
                            <p>
                                <span data-ng-bind="obj.artFamilia"></span> - <span class="yellow-text" data-ng-bind="obj.artLocalizador"></span>
                            </p>
                            <p>
                                <span data-ng-bind="obj.artModelo"></span> - <span data-ng-bind="obj.artTemporada"></span>
                            </p>
                        </td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.talla"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.tallaNombre"></td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.unidades"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.unid"></td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.bruto | currency:'EUR'"></td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.descuento | currency:'EUR'"></td>
                        <td data-ng-if="tipoTabla == tipos.ventasPrestamos" data-ng-bind="obj.neto | currency:'EUR'"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.precio | currency:'EUR'"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.tiendaDestino"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.tipoTxt"></td>
                        <td data-ng-if="tipoTabla == tipos.reservas" data-ng-bind="obj.estadoTxt"></td>
                    </tr>

                </tbody>
        </table>
    </div>
    <ms-pag-btns class="col-xs-12"></ms-pag-btns>
    <tr id="totalTr" class="yellow-text">
        <td></td>
        <td></td>
        <td translate="loc_Total" class="blue-text"></td>
        <td></td>
        <td data-ng-bind="totalUnidades"></td>
        <td></td>
        <td></td>
        <td data-ng-bind="totalValor | currency:'EUR'"></td>
    </tr>
    <div id="vprTotal_box" class="col-xs-offset-3 col-xs-8">
        <label name="loc_Total" translate="loc_Total" class="col-xs-6 blue-text" style="padding-left: 20%"></label>
        <span class="yellow-text" data-ng-bind="totalUnidades" style="padding-left: 12%"></span>
        <span class="yellow-text" data-ng-bind="totalValor | currency:'EUR'" style="padding-left: 23%"></span>
    </div>
</div>
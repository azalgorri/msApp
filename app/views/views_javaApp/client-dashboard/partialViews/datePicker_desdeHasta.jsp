<div name="desdeHasta" data-ng-controller="datePickerCtrl">
    <form name="datepickerForm" class="form-inline" role="form">
    <div class="customDatePicker col-xs-6 col-sm-5 col-md-4">
        <div class="col-xs-3 text-right">
            <span translate="loc_Desde"></span>
        </div>
        <div class="col-xs-9">
                <div class="form-group" ng-class="{'has-error': datepickerForm.desde.$invalid}">
                    <input type="text" class="form-control text-center" name="desde"
                           data-ng-model="sel.fechas.desde"
                           data-ng-change="completeObj($event)"
                           data-date-format="dd-MM-yyyy"
                           data-date-type="number"
                           data-autoclose="1" bs-datepicker>
                </div>
        </div>

        <%--<md-datepicker--%>
        <%--data-ng-model="sel.fechas.desde"--%>
        <%--data-ng-change="completeObj($event)"--%>
        <%--md-min-date="minDate"--%>
        <%--md-max-date="maxDate">--%>
        <%--</md-datepicker>--%>
    </div>
    <div class="customDatePicker col-xs-6 col-sm-5 col-md-4">
        <div class="col-xs-3 text-right">
            <span translate="loc_Hasta"></span>
        </div>
        <div class="col-xs-9">
                <div class="form-group" data-ng-class="{'has-error': datepickerForm.hasta.$invalid}">
                    <input type="text" class="form-control text-center" name="hasta"
                           data-ng-model="sel.fechas.hasta"
                           data-ng-change="completeObj($event)"
                           data-date-format="dd-MM-yyyy"
                           data-date-type="number"
                           data-autoclose="1" bs-datepicker>
                </div>
        </div>
        <%--<md-datepicker--%>
                <%--ng-model="sel.fechas.hasta"--%>
                <%--data-ng-change="completeObj($event)"--%>
                <%--md-min-date="minDate"--%>
                <%--md-max-date="maxDate">--%>
        <%--</md-datepicker>--%>
    </div>
    </form>
</div>


'use strict';

/**
 * @ngdoc service
 * @name msAppApp.global
 * @description
 * # global
 * Service in the msAppApp.
 */
angular.module('msAppApp')
  .service('glService', function () {
    this.imgURL = '172.20.120.138:8282';
    this.modulo = '';
    this.submodulos = {};
    this.submodulo = '';
    this.loading = false;
    this.botones = [];
    this.data =
    {
      clientes: [],
      ventas: [],
      vendedores: []
    };
    this.outputFiltered = [];
    this.vendedor = null;
    this.vendedoresSeleccionados = [];
    this.usrDatas = [];
    this.cliSelected = null;
    this.lastView = 1;
    this.actualView = 1;
    this.ruta = {};
    this.fondo = 0;
    this.mensaje = null;
    this.ventanas =
    {
      principal: 1,
      formulario: 2,
      seleccion: 3,
      auxiliar: {
        mensaje: 4,
        articulo: 4.1,
        fichajes: 4.2,
        horario: 4.3
      },
      vpr: 5
    };
    this.scopes =
    {
      clientes: null,
      vendedores: null,
      vpr: null,
      calendarios: null,
      fichajes: null,
      footer: null
    };
    this.colorsInPicker = [
      '7FFFDE',
      '7F00FF',
      'D2D2D2',
      'FFBF3F',
      '01AB2B',
      'AB0156',
      'FFD500',
      '038282'
    ];

    this.changeView = function (v, fondo)
    {
      this.fondo = fondo;
      if(v == this.ventanas.auxiliar.fichajes || this.actualView == this.ventanas.auxiliar.fichajes)
      {
        document.getElementsByTagName('body')[0].classList.toggle('stop-scrolling');
      }

      if(this.actualView)
        this.lastView = this.actualView.valueOf();
      this.actualView = v;
    };

    this.changeRoute = function(v, target)
    {
      this.lastView = this.actualView.valueOf();
      this.actualView = v;
      this.ruta = target;
    };

    this.deleteFromDataById = function (data, sel)
    {
      for(var x in data)
      {
        if(data[x] && sel && sel.id )
        {
          if(data[x].id == sel.id)
          {
            delete data[x];
            break;
          }
        }
      }
    };

    this.comparator = function(actual, expected)
    {
      return (actual.indexOf(expected) === 0);
    };

    this.clearForm = function(form)
    {
      var inputs = form.getElementsByTagName('input');
      var selects = form.getElementsByTagName('select');

      for(var x in inputs)
        inputs[x].value = '';

      for(var x in selects)
        selects[x].value = -1;
    };

    this.validateInput = function(input){
      var res = '';

      if (input.$invalid && input.$touched)
        res = 'requiredInput';

      return res;
    };

    this.showMessage = function(type, text, fondo)
    {
      if(fondo)
        this.fondo = fondo;

      var autoclose = (type == Mensaje.types.error || type == Mensaje.types.success);
      this.mensaje = new Mensaje(type, text, autoclose);
    };

    this.calculateBySize = function(num)
    {
      var v = 90;

      if(num)
      {
        switch (num)
        {
          case 1:
            v = 50;
            break;
          case 2:
            v = 150;
            break;
          case 3:
            v = 250;
            break;
          case 4:
            v = 350;
            break;
          case 5:
            v = 450;
            break;
        }
      }

      return Math.round(angular.element(document).height()/v);
    };

    this.resetFormValidation = function (form) {
      form.$setPristine();
      form.$setUntouched();
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name msAppApp.formatService
 * @description
 * # formatService
 * Service in the msAppApp.
 */
angular.module('msAppApp')
  .service('formatService', function ()
  {
    this.formatClientData = function (cli)
    {
      // Fecha
      var fecha = [];
      if(cli.fechaNac != null && cli.fechaNac.length == 8)
      {
        fecha[0] = cli.fechaNac.substring(0,4);
        fecha[1] = cli.fechaNac.substring(4,6);
        fecha[2] = cli.fechaNac.substring(6,8);

        cli.fechaNac = fecha[2]+'-'+fecha[1]+'-'+fecha[0];
      }

      return cli;
    };

    this.dateToString = function (date, format)
    {
      var str = '';

      if(date instanceof Date)
      {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        switch (format)
        {
          case 'dd-MM-yyyy':
            str += (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
            break;

          case 'dd/MM/yyyy':
            str += day + '/' + month + '/' + year;
            break;
        }
      }

      return str;
    };

    this.stringToDate = function (string, format)
    {
      var date = null;
      var array = [];

      if(string.includes('-'))
        array = string.split('-');
      else if(string.includes('/'))
        array = string.split('/');

      if(string.includes('-') || string.includes('/') && array.length > 0 && format)
      {
        date = new Date();

        switch (format)
        {
          case 'yyyy-MM-dd':
          case 'yyyy/MM/dd':
            date.setFullYear(array[0]);
            date.setMonth(array[1]);
            date.setDate(array[2]);
            break;

          case 'dd-MM-yyyy':
          case 'dd/MM/yyyy':
            date.setFullYear(array[2]);
            date.setMonth(array[1]);
            date.setDate(array[0]);
            break;
        }
      }

      return date;
    }
  });

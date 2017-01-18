'use strict';

/**
 * @ngdoc filter
 * @name msAppApp.filter:seleccionFilter
 * @function
 * @description
 * # seleccionFilter
 * Filter in the msAppApp.
 */
function seleccionFilter(valor, expected, entity)
{
  var newValue=[];

  for(var i=0;i<valor.length;i++)
  {
    switch (entity)
    {
      case 'cliente':
        if (valor[i].nombre.indexOf(expected)===0
          || valor[i].tarjeta.indexOf(expected)===0
          || (valor[i].codigo && valor[i].codigo.indexOf(expected)===0)
          || valor[i].dni.indexOf(expected)===0
          || valor[i].email.indexOf(expected)===0
          || valor[i].poblacion.indexOf(expected)===0) {
          newValue.push(valor[i]);
        }
        if(newValue.length == 0)
          newValue = valor;
        break;

      case 'provincia':
        if(valor[i].estado)
        {
          if (valor[i].estado.indexOf(expected)===0) {
            newValue.push(valor[i]);
          }
        }
        break;
    }
  }

  // En el caso de buscar los estado los devolveremos todos
  return (entity == 'estado') ? valor : newValue;
}
angular.module('msAppApp')
  .filter('seleccionFilter', ['$log',function ($log) {
    $log.log("Creando el filtro seleccionFilter");
    return seleccionFilter;
  }]);

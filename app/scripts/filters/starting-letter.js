'use strict';

/**
 * @ngdoc filter
 * @name msAppApp.filter:startingLetter
 * @function
 * @description
 * # startingLetter
 * Filter in the msAppApp.
 */
function startingLetter(valor, expected)
{
  if(expected)
  {
    var newValue=[];

    for(var i=0;i<valor.length;i++)
    {
      if(valor[i].nombre.toUpperCase().indexOf(expected.toUpperCase()) === 0)
      {
        newValue.push(valor[i]);
      }
    }

    return newValue;
  }

  return valor;
}
angular.module('msAppApp')
  .filter('startingLetter', ['$log',function ($log) {
    $log.log("Creando el filtro startingFilter");
    return startingLetter;
  }]);

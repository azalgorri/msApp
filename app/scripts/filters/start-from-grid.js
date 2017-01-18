'use strict';

/**
 * @ngdoc filter
 * @name msAppApp.filter:startFromGrid
 * @function
 * @description
 * # startFromGrid
 * Filter in the msAppApp.
 */
angular.module('msAppApp')
  .filter('startFromGrid', [ 'glService', function() {
    return function(input, start) {
      start = +start;
      return (input) ? input.slice(start) : null;
    };
  }]);

'use strict';

describe('Filter: seleccionFilter', function () {

  // load the filter's module
  beforeEach(module('msAppApp'));

  // initialize a new instance of the filter before each test
  var seleccionFilter;
  beforeEach(inject(function ($filter) {
    seleccionFilter = $filter('seleccionFilter');
  }));

  it('should return the input prefixed with "seleccionFilter filter:"', function () {
    var text = 'angularjs';
    expect(seleccionFilter(text)).toBe('seleccionFilter filter: ' + text);
  });

});

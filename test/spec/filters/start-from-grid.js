'use strict';

describe('Filter: startFromGrid', function () {

  // load the filter's module
  beforeEach(module('msAppApp'));

  // initialize a new instance of the filter before each test
  var startFromGrid;
  beforeEach(inject(function ($filter) {
    startFromGrid = $filter('startFromGrid');
  }));

  it('should return the input prefixed with "startFromGrid filter:"', function () {
    var text = 'angularjs';
    expect(startFromGrid(text)).toBe('startFromGrid filter: ' + text);
  });

});

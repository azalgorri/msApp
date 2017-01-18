'use strict';

describe('Filter: startingLetter', function () {

  // load the filter's module
  beforeEach(module('msAppApp'));

  // initialize a new instance of the filter before each test
  var startingLetter;
  beforeEach(inject(function ($filter) {
    startingLetter = $filter('startingLetter');
  }));

  it('should return the input prefixed with "startingLetter filter:"', function () {
    var text = 'angularjs';
    expect(startingLetter(text)).toBe('startingLetter filter: ' + text);
  });

});

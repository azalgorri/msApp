'use strict';

describe('Service: staffControl', function () {

  // load the service's module
  beforeEach(module('msAppApp'));

  // instantiate service
  var staffControl;
  beforeEach(inject(function (_staffControl_) {
    staffControl = _staffControl_;
  }));

  it('should do something', function () {
    expect(!!staffControl).toBe(true);
  });

});

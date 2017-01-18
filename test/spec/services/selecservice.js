'use strict';

describe('Service: selecService', function () {

  // load the service's module
  beforeEach(module('msAppApp'));

  // instantiate service
  var selecService;
  beforeEach(inject(function (_selecService_) {
    selecService = _selecService_;
  }));

  it('should do something', function () {
    expect(!!selecService).toBe(true);
  });

});

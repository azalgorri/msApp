'use strict';

describe('Service: formatService', function () {

  // load the service's module
  beforeEach(module('msAppApp'));

  // instantiate service
  var formatService;
  beforeEach(inject(function (_formatService_) {
    formatService = _formatService_;
  }));

  it('should do something', function () {
    expect(!!formatService).toBe(true);
  });

});

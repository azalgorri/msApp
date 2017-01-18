'use strict';

describe('Controller: VprPagCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var VprPagCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VprPagCtrl = $controller('VprPagCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VprPagCtrl.awesomeThings.length).toBe(3);
  });
});

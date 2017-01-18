'use strict';

describe('Controller: VendedoresCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var VendedoresCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VendedoresCtrl = $controller('VendedoresCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VendedoresCtrl.awesomeThings.length).toBe(3);
  });
});

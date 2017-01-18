'use strict';

describe('Controller: SeleccionCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var SeleccionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeleccionCtrl = $controller('SeleccionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SeleccionCtrl.awesomeThings.length).toBe(3);
  });
});

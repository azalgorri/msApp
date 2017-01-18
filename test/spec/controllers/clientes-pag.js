'use strict';

describe('Controller: ClientesPagCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var ClientesPagCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientesPagCtrl = $controller('ClientesPagCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ClientesPagCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: FichajesPagCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var FichajesPagCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FichajesPagCtrl = $controller('FichajesPagCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FichajesPagCtrl.awesomeThings.length).toBe(3);
  });
});

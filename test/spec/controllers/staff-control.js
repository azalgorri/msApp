'use strict';

describe('Controller: StaffControlCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var StaffControlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StaffControlCtrl = $controller('StaffControlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StaffControlCtrl.awesomeThings.length).toBe(3);
  });
});

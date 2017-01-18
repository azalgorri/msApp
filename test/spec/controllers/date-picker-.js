'use strict';

describe('Controller: DatePickerCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var DatePickerCtrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatePickerCtrlCtrl = $controller('DatePickerCtrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DatePickerCtrlCtrl.awesomeThings.length).toBe(3);
  });
});

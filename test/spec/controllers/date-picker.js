'use strict';

describe('Controller: DatePickerCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var DatePickerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatePickerCtrl = $controller('DatePickerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DatePickerCtrl.awesomeThings.length).toBe(3);
  });
});

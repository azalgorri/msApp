'use strict';

describe('Controller: CalendariosCtrl', function () {

  // load the controller's module
  beforeEach(module('msAppApp'));

  var CalendariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CalendariosCtrl = $controller('CalendariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CalendariosCtrl.awesomeThings.length).toBe(3);
  });
});

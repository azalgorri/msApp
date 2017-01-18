'use strict';

describe('Directive: clickMe', function () {

  // load the directive's module
  beforeEach(module('msAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<click-me></click-me>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the clickMe directive');
  }));
});

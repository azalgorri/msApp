'use strict';

describe('Directive: msAuxiliarFichajes', function () {

  // load the directive's module
  beforeEach(module('msAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ms-auxiliar-fichajes></ms-auxiliar-fichajes>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the msAuxiliarFichajes directive');
  }));
});

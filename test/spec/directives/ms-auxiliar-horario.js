'use strict';

describe('Directive: msAuxiliarHorario', function () {

  // load the directive's module
  beforeEach(module('msAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ms-auxiliar-horario></ms-auxiliar-horario>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the msAuxiliarHorario directive');
  }));
});

'use strict';

describe('Controller: SchemaMakerCtrl', function () {

  // load the controller's module
  beforeEach(module('gAmPieApp'));

  var SchemaMakerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchemaMakerCtrl = $controller('SchemaMakerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

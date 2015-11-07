'use strict';

describe('Controller: VisualizeCtrl', function () {

  // load the controller's module
  beforeEach(module('gAmPieApp'));

  var VisualizeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VisualizeCtrl = $controller('VisualizeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

'use strict';

describe('Controller: GenerateJSONCtrl', function () {

  // load the controller's module
  beforeEach(module('gAmPieApp'));

  var GenerateJSONCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GenerateJSONCtrl = $controller('GenerateJSONCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

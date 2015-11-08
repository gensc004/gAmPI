'use strict';

describe('Controller: CustomDataSchemasCtrl', function () {

  // load the controller's module
  beforeEach(module('gAmPieApp'));

  var CustomDataSchemasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomDataSchemasCtrl = $controller('CustomDataSchemasCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

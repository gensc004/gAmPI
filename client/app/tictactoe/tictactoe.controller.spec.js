'use strict';

describe('Controller: TictactoeCtrl', function () {

  // load the controller's module
  beforeEach(module('gAmPieApp'));

  var TictactoeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TictactoeCtrl = $controller('TictactoeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});

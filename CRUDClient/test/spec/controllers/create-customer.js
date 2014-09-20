'use strict';

describe('Controller: CreateCustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var CreateCustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCustomerCtrl = $controller('CreateCustomerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

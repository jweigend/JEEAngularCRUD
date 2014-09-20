'use strict';

describe('Controller: ListCustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var ListCustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListCustomerCtrl = $controller('ListCustomerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Service: customersvc', function () {

  // load the service's module
  beforeEach(module('crudApp'));

  // instantiate service
  var customersvc;
  beforeEach(inject(function (_customersvc_) {
    customersvc = _customersvc_;
  }));

  it('should do something', function () {
    expect(!!customersvc).toBe(true);
  });

});

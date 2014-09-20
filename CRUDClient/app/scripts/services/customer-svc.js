'use strict';

/**
 * @ngdoc service
 * @name crudApp.customersvc
 * @description
 * # customersvc
 * # $resource
 * Service in the crudApp.
 */
angular.module('customerServices', ['ngResource'])
        .factory('customerSvc', ['$resource',
            function ($resource) {
                return $resource(
                        'http://localhost:8080/customerserver/webresources/com.javaone.customerserver.customer/:customerId:id',
                        {},
                        {
                            update: { method: 'PUT', params: {id: '@customerId'} }
                        });
            }]);


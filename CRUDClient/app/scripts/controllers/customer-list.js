'use strict';
/**
 * @ngdoc function
 * @name crudApp.controller:ListCustomerCtrl
 * @description
 * # ListCustomerCtrl
 * Controller of the crudApp
 */
angular.module('crudApp')
        .controller('ListCustomersCtrl', function ($scope, $location, customerSvc) {
//            $scope.customers = [
//                {id: 1, name: "Johannes Weigend", email: "johannes.weigend@weigend.de"},
//                {id: 2, name: "Geertjan Wielenga", email: "gertjan.wielanga@oracle.com"},
//                {id: 3, name: "Peter Pan", email: "peter.pan@disney.com"}
//            ];
            $scope.customers = customerSvc.query();
            
            /* callback for ng-click 'createCustomer': */
            $scope.createCustomer = function () {
                $location.path('/customer-detail/0');
            };
            
            /* callback for ng-click 'updateCustomer': */
            $scope.updateCustomer = function (customerId) {
                $location.path('/customer-detail/' + customerId);
            };
            
            /* callback for ng-click 'deleteCustomer': */
            $scope.deleteCustomer = function (customerId) {
                var customer = $scope.customers.splice(0, 1); // TODO Hack
                customer[0].$remove({id: customerId}, function (data) {
                    // after update we have to update the customers array
                    $scope.customers = customerSvc.query();
                    $location.path('/customer-list');
                }, function (err) {
                    alert('request failed');
                });
            };
        });

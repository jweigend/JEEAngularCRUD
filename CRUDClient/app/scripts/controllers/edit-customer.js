'use strict';

/**
 * @ngdoc Update and Create controller.
 * @name crudApp.controller:EditCustomerCtrl
 * @description
 * # EditCustomerCtrl
 * Controller of the crudApp
 */
angular.module('crudApp')
        .controller('EditCustomerCtrl',
                function ($scope, $location, customerSvc, $routeParams) {

                    // store for later use in controller functions
                    $scope.customerSvc = customerSvc;

                    // this controller handles insert and update pages
                    $scope.editMode = ($routeParams.id !== "0");
                    if ($scope.editMode) {
                        $scope.customer = customerSvc.get({id: $routeParams.id});
                        $scope.customerSvc = customerSvc;
                    } else {
                        $scope.customer = {id: 1, name: "", email: ""};
                    }


                    /* callback for ng-click 'updateUser': */
                    $scope.updateCustomer = function () {
                        var customer = $scope.customer;
                        customer.$update(function (data) {
                            // after update we have to also update the client model
                            $scope.customers = customerSvc.query();
                            $location.path('/list-customers');
                        }, function (err) {
                            alert('request failed');
                        });
                    };

                    $scope.createCustomer = function () {
                        var customer = $scope.customer;

                        // hard coded foreign keys
                        customer.discountCode = {discountCode: "M", rate: 11};
                        customer.zip = {zipCode: "95035"};
                        // hack for "unique" ids
                        customer.customerId = Math.floor((Math.random() * 1000000) + 1);

                        var savedCustomer = $scope.customerSvc.save({}, customer);
                        savedCustomer.$promise.then(function (result) {
                            $scope.customers = customerSvc.query();
                            $location.path('/list-customers');
                        });
                    };

                    /* callback for ng-click 'cancel': */
                    $scope.cancel = function () {
                        $location.path('/list-customers');
                    };
                }
        );

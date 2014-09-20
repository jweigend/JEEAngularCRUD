'use strict';

/**
 * @ngdoc overview
 * @name crudApp
 * @description
 * # crudApp
 *
 * Main module of the application.
 */
angular
  .module('crudApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'customerServices'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/list-customers', {
        templateUrl: 'views/list-customers.html',
        controller: 'ListCustomersCtrl'
      })
      .when('/edit-customer/:id', {
        templateUrl: 'views/edit-customer.html',
        controller: 'EditCustomerCtrl'
      })
       .when('/create-customer', {
        templateUrl: 'views/edit-customer.html',
        controller: 'CreateCustomerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

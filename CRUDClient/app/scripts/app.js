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
      .when('/customer-list', {
        templateUrl: 'views/customer-list.html',
        controller: 'ListCustomersCtrl'
      })
      .when('/customer-detail/:id', {
        templateUrl: 'views/customer-detail.html',
        controller: 'EditCustomerCtrl'
      })
       .when('/customer-detail', {
        templateUrl: 'views/customer-detail.html',
        controller: 'CreateCustomerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc overview
 * @name msAppApp
 * @description
 * # msAppApp
 *
 * Main module of the application.
 */
angular
  .module('msAppApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/staff-control', {
        templateUrl: 'views/staff-control.html',
        controller: 'StaffControlCtrl',
        controllerAs: 'staffControl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc overview
 * @name tasklistWeb
 * @description
 * # tasklistWeb
 *
 * Main module of the application.
 */
angular
  .module('tasklistWeb', ['appServices',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/tasklist.html',
        controller: 'tasklist-controller',
        controllerAs: 'tasklist'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// quando usar "angular.bootstrap" não precisa mais fazer [ng-app="tasklistWeb"
//angular.bootstrap(document.body, ['app']);

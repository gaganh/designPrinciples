'use strict';

/**
 * @ngdoc overview
 * @name designPrinciplesApp
 * @description
 * # designPrinciplesApp
 *
 * Main module of the application.
 */
angular
  .module('designPrinciplesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'oitozero.ngSweetAlert'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl',
        controllerAs: 'leaderboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

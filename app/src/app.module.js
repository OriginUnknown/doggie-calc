(function() {
  'use strict';

  angular.module('app', [
    'ngResource',
    'ui.router',
    'app.rename',
    'app.home'

  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('rename', {
        url: '/rename-page',
        templateUrl: '../src/app.component.html',
        controller: 'AppController',
        controllerAs: 'appCtrl'
      })
      .state('/home', {
        url: '/home',
        templateUrl: '../src/views/home/home.component.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })

    $locationProvider.html5Mode(true);
  }

})();

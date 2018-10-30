(function() {
  'use strict';

  angular.module('app', [
    'ngResource',
    'ui.router',
    'app.home',
    'app.route-details',
    'app.route-map',
    'app.DogTreatsFactoryModule'

  ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);

  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '../src/views/home/home.component.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl',
        resolve: {
          routes: function(DogTreatsFactory){
            return DogTreatsFactory.getAllRoutes();
          }
        }
      })
      .state('routeDetails', {
        url: "/walking-route/:id",
        templateUrl: '../src/views/route-details/route-details.component.html',
        controller: 'RouteDetailsController',
        controllerAs: 'routeDetailsCtrl'
      })
      .state('viewMap', {
        url: "^/view-walking-route/:mapId",
        templateUrl: '../src/views/route-map/route-map.component.html',
        controller: 'RouteMapController',
        controllerAs: 'RouteMapCtrl'
      });

      $urlRouterProvider.otherwise('/home');

    $locationProvider.html5Mode(true);
  }

})();

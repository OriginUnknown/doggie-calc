(function(){

  'use strict';

  angular.module('app.route-map', [ 'app.GoogleMapsAPIModule' ])
         .controller('RouteMapController', [ '$state', '$stateParams', '$timeout', 'GoogleMapsAPIModuleFactory', RouteMapControllerFn ]);

  function RouteMapControllerFn($state, $stateParams, $timeout, GoogleMapsAPIModuleFactory) {
    var self = this;
    self.backToRouteDetails = backToRouteDetails;

    _init();

    function _init() {
      $timeout(
        function() {
          // timeout used to give the component time to render in the DOM before
          // the map in drawn
          GoogleMapsAPIModuleFactory.initMap();
      }, 500);
    }

    function backToRouteDetails() {
      $state.go('routeDetails', { id: $stateParams.id });
    }
  }
})();

(function(){

  'use strict';

  angular.module('app.route-map', ['app.GoogleMapsAPIModule'])
         .controller('RouteMapController', [ 'GoogleMapsAPIModuleFactory', RouteMapControllerFn ]);

  function RouteMapControllerFn(GoogleMapsAPIModuleFactory) {
    var self = this;

    _init();

    function _init() {
      GoogleMapsAPIModuleFactory.initMap();
    }
  }
})();

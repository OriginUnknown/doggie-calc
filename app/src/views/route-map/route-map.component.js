(function(){

  'use strict';

  angular.module('app.route-map', [])
         .controller('RouteMapController', [ RouteMapControllerFn ]);

  function RouteMapControllerFn() {
    var self = this, _cart = {}, _totalPrice = 0;
    console.log('hello from Route Map controller');

    function dummy(val){ }


  }
})();

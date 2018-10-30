(function(){

  'use strict';

  angular.module('app.route-details', [])
         .controller('RouteDetailsController', [ RouteDetailsControllerFn ]);

  function RouteDetailsControllerFn() {
    var self = this, _cart = {}, _totalPrice = 0;
    console.log('hello from Route Details controller');

    function dummy(val){ }


  }
})();

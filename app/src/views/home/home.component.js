(function(){

  'use strict';

  angular.module('app.home', [])
         .controller('HomeController', [HomeControllerFn]);

  function HomeControllerFn() {
    var self = this, _cart = {}, _totalPrice = 0;
    console.log('hello from Route Map controller');

    function dummy(val){ }


  }
})();

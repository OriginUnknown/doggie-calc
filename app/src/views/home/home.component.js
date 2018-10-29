(function(){

  'use strict';

  angular.module('app.home', [])
         .controller('HomeController', [HomeControllerFn]);

  function HomeControllerFn() {
    var self = this, _cart = {}, _totalPrice = 0;
    console.log('hello world');

    // function _productIsADuplicate(product, inventory){
    //   return inventory.find(function(item){
    //     return item.name === product.name;
    //   });
    // }


  }
})();

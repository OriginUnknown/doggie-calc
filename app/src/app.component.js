(function(){

  'use strict';

  angular.module('app.rename', [])
         .controller('AppController', [ AppControllerFn ]);

  function AppControllerFn() {
    var self = this, _one = {}, two = 0;
    console.log('App controller. RENAME PLEASE!');

    function dummy(val){
      return val;
    }

  }
})();

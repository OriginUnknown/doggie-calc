(function() {

  'use strict';

  angular.module('app.home', [])
    .controller('HomeController', [ 'routes', HomeControllerFn ]);

  function HomeControllerFn(routes) {
    var self = this;
    self.walkingRoutes = routes;
    console.log('hello from Route Map controller');
    console.log(self.walkingRoutes);

  }
})();

(function() {

  'use strict';

  angular.module('app.home', [])
    .controller('HomeController', [ 'routes', HomeControllerFn ]);

  function HomeControllerFn(routes) {
    var self = this;

    _init();

    function _init() {
      for(var i = 0; i < routes.length; i++) {
        routes[i]['title'] = 'Some blurb about ' + routes[i].name;
        routes[i]['description'] = 'Some wonderful blurb about ' + routes[i].name +'.';
      }
      self.walkingRoutes = routes;
    }
  }
})();

(function() {

    'use strict';

    angular.module('app.route-details', ['app.DogTreatsFactoryModule'])
      .controller('RouteDetailsController', ['DogTreatsFactory', '$state', '$stateParams', RouteDetailsControllerFn]);

    function RouteDetailsControllerFn(DogTreatsFactory, $state, $stateParams) {
      var self = this;
      this.getSelectedRouteMap = getSelectedRouteMap;

      _init();

      function _init() {
        _getSelectedRoute.call(self, $stateParams.id);
      }

      function _getSelectedRoute(id) {
        DogTreatsFactory.getSelectedRoute(id).then(
          function(data){
            data['description'] = 'Some more blurb about ' + data.route;
            self.treats = data;
            console.log(self.treats);
          }
        );
      }

      function getSelectedRouteMap() {
        self.treats.route = self.treats.route.toLowerCase().replace(/\s+/g,"-");;
        $state.go('viewMap', { id: self.treats.id, name: self.treats.route });
      }
  }
})();

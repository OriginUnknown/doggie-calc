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
            self.treats = data;
            console.log(self.treats);
          }
        );
      }

      function getSelectedRouteMap() {
        $state.go('viewMap');
      }
  }
})();

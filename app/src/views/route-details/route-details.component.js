(function() {

    'use strict';

    angular.module('app.route-details', ['app.DogTreatsFactoryModule'])
      .controller('RouteDetailsController', ['DogTreatsFactory', '$stateParams', RouteDetailsControllerFn]);

    function RouteDetailsControllerFn(DogTreatsFactory, $stateParams) {
      var self = this;

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
  }
})();

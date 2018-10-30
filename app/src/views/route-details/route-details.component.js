(function() {

    'use strict';

    angular.module('app.route-details', ['app.DogTreatsFactoryModule'])
      .controller('RouteDetailsController', ['DogTreatsFactory', '$stateParams', RouteDetailsControllerFn]);

    function RouteDetailsControllerFn(DogTreatsFactory, $stateParams) {
      var self = this;
      // for later
      self.viewThisRoute = viewThisRoute;

      _init();

      function _init() {
        _getSelectedRoute.call(self, $stateParams.id);
      }

      function _getSelectedRoute(id) {
        DogTreatsFactory.getSelectedRoute(id)
          .then(_onSelectedRouteLoadedSuccess)
          .catch(_onSelectedRouteFailedToLoad);
      }

      function _onSelectedRouteLoadedSuccess(response) {
        _calculateTreats.call(self, response);
      }

      function _onSelectedRouteFailedToLoad(error) {
        console.log('Unable to load chosen walking route: ' + error);
      }

      function _calculateTreats(data) {
        console.log('process data from api');
        console.log(data);
        var treats = {}; // treats:{ deficit: 5, stored: 2}
        treats.deficit = 0;
        for (var i = 0; i < data.locations.length; i++) {
          var currentPosition = data.locations[i],
            nextPosition = data.locations[i + 1], diff;
          if (nextPosition) {
            var currentAltitude = currentPosition.altitude,
              nextAltitude = nextPosition.altitude;
            if (currentAltitude > nextAltitude) {
              // Downhill walkies;
              // if first currentAltitude value is downhill, store the diff of
              // snacks between first currentAltitude and the nextAltitude
              if(!treats['stored']){
                treats['stored'] = currentAltitude - nextAltitude;
              } else {
                // if dowhill and we already have snacks, add the snack diff
                // between currentAltitude and nextAltitude
                diff = currentAltitude - nextAltitude;
                treats['stored'] = treats.stored + diff;
              }
              console.log('Downhill: Store treats for later: ' + treats.stored);
            } else if (nextAltitude > currentAltitude) {
              // Uphill walkies -> if there are enough stored snacks to cover
              // the difference between currentAltitude and the nextAltitude;
              if (treats.stored >= (nextAltitude - currentAltitude)) {
                console.log('Uphill: Current treats: ' + treats.stored + ' . Give out: ' + currentAltitude + ' treats. Treats remaining: ' + (treats.stored - currentAltitude));
                diff = nextAltitude - currentAltitude;
                treats.stored = treats.stored - diff;
              } else {
                // As this is the start and there are no snacks to begin trekking
                // uphill calculate the deficit difference between first
                // currentAltitude and the nextAltitude
                if(!treats['stored']){
                  treats['stored'] = 0;
                }
                console.log('Treat deficit. Distance: ' + nextAltitude +'. Current treats: ' + treats.stored + '. Treats needed: ' + ((nextAltitude - currentAltitude) - treats.stored));
                diff = (nextAltitude - currentAltitude) - treats.stored;
                treats.deficit = treats.deficit + diff;
                treats.stored = 0;
              }
            } else {
              console.log('Walking on flat lands. no treats stored.');
            }
          } else {
            console.log('End of walkies');
          }
        }
        console.log('This route requires ' + (treats.deficit ? treats.deficit : 0) +' treats with ' + treats.stored +' treats stored.');
        self.treats = treats;
        return true;
      }

    function viewThisRoute() {
      // call google api
    }

  }
})();

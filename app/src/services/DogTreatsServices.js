(function(){
  'use strict';

  angular.module('app.DogTreatsFactoryModule', ['ngResource'])
         .factory('DogTreatsFactory', ['$resource', GetDogTreatsFactory]);

  function GetDogTreatsFactory($resource){
    var factory = {}, selectedRouteLocation,
        getAllRoutesResourceUrl = $resource('https://infinite-lake-80504.herokuapp.com/api/routes'),
        getSelectedRouteResourceUrl = $resource('https://infinite-lake-80504.herokuapp.com/api/routes/:route_id', {id: '@route_id'});

    // Exposed DogTreatsFactory API
    factory.getAllRoutes = getAllRoutes;
    factory.getSelectedRoute = getSelectedRoute;
    factory.getSelectedRouteLocations = getSelectedRouteLocations;
    return factory;

    function getAllRoutes() {
      return getAllRoutesResourceUrl.query().$promise
      .then(_onAllRoutesLoadedSuccess)
      .catch(_onAllRoutesFailedToLoad);
    }

    function getSelectedRoute(route_id) {
      return getSelectedRouteResourceUrl.get({ route_id }).$promise
      .then(_onSelectedRouteLoadedSuccess)
      .catch(_onSelectedRouteFailedToLoad);
    }

    function _onAllRoutesLoadedSuccess(response) {
      return response;
    }

    function _onAllRoutesFailedToLoad(error) {
      console.log('Unable to load routes: '+ error);
    }

    function _onSelectedRouteLoadedSuccess(response) {
      selectedRouteLocation = response.locations;
      return _calculateTreats(response);
    }

    function getSelectedRouteLocations() {
      return (selectedRouteLocation === undefined) ? {} : selectedRouteLocation;
    }

    function _onSelectedRouteFailedToLoad(error) {
      console.log('Unable to load chosen walking route: ' + error);
    }

    function _calculateTreats(data) {
      var walkRouteData = {
        id: data.id,
        route: data.name,
        treats: {},
        locations: data.locations
      };
      walkRouteData.treats.deficit = 0;
      for (var i = 0; i < data.locations.length; i++) {
        var currentPosition = data.locations[i],
          nextPosition = data.locations[i + 1], diff;
        if (nextPosition) {
          var currentAltitude = currentPosition.altitude,
            nextAltitude = nextPosition.altitude;
          if (currentAltitude > nextAltitude) {
            // Downhill walkies;
            if(!walkRouteData.treats['stored']){
              walkRouteData.treats['stored'] = currentAltitude - nextAltitude;
            } else {
              // if dowhill and we already have snacks, add the snack diff between currentAltitude and nextAltitude
              diff = currentAltitude - nextAltitude;
              walkRouteData.treats['stored'] = walkRouteData.treats.stored + diff;
            }
          } else if (nextAltitude > currentAltitude) {
            // Uphill walkies -> if there are enough stored snacks to cover the difference between currentAltitude and the nextAltitude;
            if (walkRouteData.treats.stored >= (nextAltitude - currentAltitude)) {
              diff = nextAltitude - currentAltitude;
              walkRouteData.treats.stored = walkRouteData.treats.stored - diff;
            } else {
              // As this is the start and there are no snacks to begin trekking uphill calculate
              // the deficit difference between first currentAltitude and the nextAltitude
              if(!walkRouteData.treats['stored']){
                walkRouteData.treats['stored'] = 0;
              }
              diff = (nextAltitude - currentAltitude) - walkRouteData.treats.stored;
              walkRouteData.treats.deficit = walkRouteData.treats.deficit + diff;
              walkRouteData.treats.stored = 0;
            }
          }
        }
      }
      return walkRouteData;
    }

  }

})();

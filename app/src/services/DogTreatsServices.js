(function(){
  'use strict';

  angular.module('app.DogTreatsFactoryModule', ['ngResource'])
         .factory('DogTreatsFactory', ['$resource', GetDogTreatsFactory]);

  function GetDogTreatsFactory($resource){
    var factory = {},
        getAllRoutesResourceUrl = $resource('https://infinite-lake-80504.herokuapp.com/api/routes'),
        getSelectedRouteResourceUrl = $resource('https://infinite-lake-80504.herokuapp.com/api/routes/:route_id', {id: '@route_id'});

    // Exposed DogTreatsFactory API
    factory.getAllRoutes = getAllRoutes;
    factory.getSelectedRoute = getSelectedRoute;
    return factory;

    function getAllRoutes(){
      return getAllRoutesResourceUrl.query().$promise
      .then(_onAllRoutesLoadedSuccess)
      .catch(_onAllRoutesFailedToLoad);
    }

    function getSelectedRoute(route_id){
      return getSelectedRouteResourceUrl.get({ route_id }).$promise;
    }

    function _onAllRoutesLoadedSuccess(response){
      return response;
    }

    function _onAllRoutesFailedToLoad(error){
      console.log('Unable to load routes: '+ error);
    }

  }

})();

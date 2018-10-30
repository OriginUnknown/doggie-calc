(function(){

  'use strict';

  angular.module('app.route-details', ['app.DogTreatsFactoryModule'])
         .controller('RouteDetailsController', [ 'DogTreatsFactory', '$stateParams', RouteDetailsControllerFn ]);

  function RouteDetailsControllerFn(DogTreatsFactory, $stateParams) {
    var self = this;
    self.getSelectedRoute = _getSelectedRoute;
    console.log('hello from Route Details controller');

    _init();

    function _init(){
      self.getSelectedRoute($stateParams.id);
    }

    function _getSelectedRoute(id){
      DogTreatsFactory.getSelectedRoute(id)
      .then(_onSelectedRouteLoadedSuccess)
      .catch(_onSelectedRouteFailedToLoad);
    }

    function _onSelectedRouteLoadedSuccess(response){
      self.results = response;
      console.log(self.results);
    }

    function _onSelectedRouteFailedToLoad(error){
      console.log('Unable to load chosen walking route: '+ error);
    }

  }
})();

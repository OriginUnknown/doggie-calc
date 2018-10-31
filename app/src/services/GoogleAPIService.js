(function(){
  'use strict';

  angular.module('app.GoogleMapsAPIModule', ['ngResource', 'app.DogTreatsFactoryModule'])
         .factory('GoogleMapsAPIModuleFactory', ['$resource', 'DogTreatsFactory', GetGoogleMapsAPIModuleFactory]);

  function GetGoogleMapsAPIModuleFactory($resource, DogTreatsFactory){
    var factory = {}, map, options = {};

    factory.initMap = initMap;
    return factory;

    function initMap(){
      console.log('load map');
      var markerArray = [];
      // Instantiate a directions service.
      var directionsService = new google.maps.DirectionsService;
      // Instantiate an info window to hold step text.
      var stepDisplay = new google.maps.InfoWindow;
      options['coords'] = DogTreatsFactory.getSelectedRouteLocations(); //[{},{lat:0, long:0}]
      console.log(options.coords);
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.51973438454002, lng: -0.1222349703313059},
        zoom: 13
      });

      var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
        calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };
    }

    function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
      // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }
        directionsService.route({
          origin: new google.maps.LatLng(51.51973438454002, -0.1222349703313059),
          destination: new google.maps.LatLng(51.51940237735539, -0.1229298301042271),
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }

    function showSteps(directionResult, markerArray, stepDisplay, map){
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
          attachInstructionText(
              stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
    }

    function attachInstructionText(stepDisplay, marker, text, map) {
      google.maps.event.addListener(marker, 'click', function() {
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
      });
    }

  }

})();

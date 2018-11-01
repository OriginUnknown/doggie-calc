(function(){
  'use strict';

  angular.module('app.GoogleMapsAPIModule', ['ngResource', 'app.DogTreatsFactoryModule'])
         .factory('GoogleMapsAPIModuleFactory', ['$resource', 'DogTreatsFactory', GetGoogleMapsAPIModuleFactory]);

  function GetGoogleMapsAPIModuleFactory($resource, DogTreatsFactory){
    var factory = {}, map, mapOverview, options = {};

    factory.initMap = initMap;
    return factory;

    function initMap(){
      console.log('load map');
      var markerArray = [], directionsService = new google.maps.DirectionsService;
      var stepDisplay = new google.maps.InfoWindow;
      options['coords'] = DogTreatsFactory.getSelectedRouteLocations();
      console.log(options.coords);
      var mapLat = options.coords[0].latitude, mapLong = options.coords[0].longitude;
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: mapLat, lng: mapLong },
        zoom: 13
      });

      var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
        calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
        };
    }

    function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }
        var startingMapLat = options.coords[0].latitude,
        startingMapLong = options.coords[0].longitude,
        finishMapLat = options.coords[options.coords.length - 1].latitude,
        finishMapLong = options.coords[options.coords.length - 1].longitude;
        directionsService.route({
          origin: new google.maps.LatLng(startingMapLat, startingMapLong),
          destination: new google.maps.LatLng(finishMapLat, finishMapLong),
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

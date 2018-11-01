(function() {
    'use strict';

    angular
        .module('app.googleMapImageModule', [])
        .component('googleMapImage', {
            bindings: {},
            templateUrl: './src/components/google-map-image/google-map-image.html',
            controller: GoogleMapsController,
            controllerAs: '$GoogleMapsCtrl'
        });

    function GoogleMapsController() {
        var self = this;
    }

}());

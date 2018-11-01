(function() {
    'use strict';

    angular
        .module('app.walkingRouteMapImageModule', [])
        .component('walkingRouteMapImage', {
            bindings: {
                // data: '='
            },
            templateUrl: './src/components/walking-route-map-image/walking-route-map-image.html',
            controller: RouteMapDetailsController,
            controllerAs: '$routeMapDetailsCtrl'
        });

    function RouteMapDetailsController() {
        var self = this;

        // self.activities = [];
        // self.doFunnyStuff = doFunnyStuff;
        //
        // function doFunnyStuff() {
        //     vm.activities.push('yolo');
        // }
    }

}());

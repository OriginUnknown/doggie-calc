(function() {
    'use strict';

    angular
        .module('app.walkingRoutesModule', [])
        .component('walkingRoute', {
            bindings: {
                route: '='
            },
            templateUrl: './src/components/walking-route/walking-route.html',
            controller: WalkingRouteController,
            controllerAs: '$walkRouteCtrl'
        });

    function WalkingRouteController() {
        var self = this;
    }

}());

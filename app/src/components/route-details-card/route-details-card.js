(function() {
    'use strict';

    angular
        .module('app.routeDetailsCardModule', [])
        .component('routeDetailsCard', {
            bindings: {
                details: '=',
                onViewRouteImage: '&onViewRouteImage'
            },
            templateUrl: './src/components/route-details-card/route-details-card.html',
            controller: RouteDetailsController,
            controllerAs: '$routeDetailsCtrl'
        });

    function RouteDetailsController() {
        var self = this;
    }

}());

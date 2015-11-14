var GatheringApp = angular.module('GatheringApp', ['leaflet-directive']);

GatheringApp.config(function($interpolateProvider, $logProvider) {
	$interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
    $logProvider.debugEnabled(false);
});

GatheringApp.controller('MapCtrl', function() {
	mcScope = this;
	this.categories = [
		{
			id: 1,
			name: 'Basketball'
		},
		{
			id: 2,
			name: 'run'
		},
		{
			id: 3,
			name: 'cycling'
		},
		{
			id: 4,
			name: 'gym'
		}
	];

	this.map = {
		center: {
            lat: 52.374004,
            lng: 4.890359,
            zoom: 7
        },
        defaults: {
	        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
	        zoomControlPosition: 'topright',
	        tileLayerOptions: {
	            opacity: 0.9,
	            detectRetina: true,
	            reuseTiles: true,
	        },
	        scrollWheelZoom: false
	    },
	    markers: {

	    },
        events: {
        }
	}
});
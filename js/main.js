var GatheringApp = angular.module('GatheringApp', ['leaflet-directive']);

GatheringApp.config(function($interpolateProvider, $logProvider) {
	$interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
    $logProvider.debugEnabled(false);
});

GatheringApp.service('MapService', function() {
	that = this;

	this.map = {
		center: {
            lat: 25.0453633,
            lng: 121.528795,
            zoom: 12
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
	};

	this.initMap = function () {
		return that.map;
	};

	this.addUsersIntoMarkers = function(user_tag_list) {

	};

	this.addMarkers = function (data_list) {
		angular.forEach(data_list, function(data, index) {
			that.map.markers[index] = {
				lat : parseFloat(data.lat),
				lng : parseFloat(data.lng),
				message : '<popup index="'+ index +'"></popup>'
			};
		});
	};
});

GatheringApp.controller('MapCtrl', function (MapService) {
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
	(function init() {
		mcScope.map = MapService.initMap();
		mcScope.users = window.GATHERING_DATA.user1;
		MapService.addMarkers(window.GATHERING_DATA.gym)
	})();
});

GatheringApp.directive('popup', function() {
	return {
		restrict: "E",
		replace: true,
		scope: {
			index: '='
		},
		link: function(scope, element, attrs) {
			console.log(scope.index);
		},
		templateUrl: '/partials/popup.html'
	}
});
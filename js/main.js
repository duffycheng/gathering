var GatheringApp = angular.module('GatheringApp', ['leaflet-directive']);

GatheringApp.config(function($interpolateProvider, $logProvider) {
	$interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
    $logProvider.debugEnabled(false);
});

GatheringApp.factory('HelperFactory', function() {
	return {
		getParsedCheckInData: function (origin_checkin_list) {
			var dataArr = origin_checkin_list.data, restructureArr=[];
	        dataArr.forEach(function(value){
	          var tempData = {};
	          tempData.lat = value.place.location.latitude;
	          tempData.lng = value.place.location.longitude;
	          tempData.name = value.place.name;
	          restructureArr.push(tempData);
	        });
	        return restructureArr;
		},
		compareLocation: function (target, resource){
         	var compareNumber = 0.001;
          	return (Math.abs(target.lat - resource.lat) <= compareNumber) && (Math.abs(target.lng - resource.lng) <= compareNumber);
       	}
	};s
});

GatheringApp.service('MapService', function (HelperFactory) {
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


	this.addUsersIntoMarkers = function(users) {
		// var new_checkin_list = HelperFactory.getParsedCheckInData(origin_checkin_list);
		angular.forEach(users, function(user, nc_idx) {
			angular.forEach(user.checkin_list, function(checkin, f_idx) {
				angular.forEach(that.map.markers, function(marker, m_idx) {
					if(HelperFactory.compareLocation(marker, checkin)) {
						marker.friends.push(user);
						marker.icon = {
							iconUrl: 'images/pin_red.png',
							iconSize: [25, 41],
							iconAnchor: [12.5, 41],
							popupAnchor:  [0, -41]
						},
						console.log('Y');
					}
					else {
						console.log('N');
					}
				});
			})

		});
	};

	this.syncMarkers = function (data_list) {
		that.map.markers = {};
		angular.forEach(data_list, function(data, index) {
			that.map.markers[index] = {
				lat : parseFloat(data.lat),
				lng : parseFloat(data.lng),
				icon : {
					iconUrl: 'images/pin_blue.png',
					iconSize: [25, 41],
					iconAnchor: [12.5, 41],
					popupAnchor:  [0, -41]
				},
				friends : [],
				message : '<popup index="'+ index +'"></popup>'
			};
		});
	};

	this.getMarkerObj = function(index) {
		return that.map.markers[index];
	};
});

GatheringApp.controller('MapCtrl', function (MapService) {
	mcScope = this;

	this.categories = [
		{
			id: 1,
			name: 'gym'
		},
		{
			id: 2,
			name: 'swimming'
		},
		{
			id: 3,
			name: 'tennis'
		},
		{
			id: 4,
			name: 'yoga'
		},
		{
			id: 5,
			name: 'basketball'
		},
		{
			id: 6,
			name: 'baseball'
		}
	];

	mcScope.updateMap = function (category_name) {
		MapService.syncMarkers(window.GATHERING_DATA.categories[category_name]);
		MapService.addUsersIntoMarkers(window.GATHERING_DATA.users);
	};

	(function init() {
		mcScope.map = MapService.initMap();


	})();
});

GatheringApp.directive('popup', function (MapService) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			index: '='
		},
		link: function(scope, element, attrs) {
			scope.marker = MapService.getMarkerObj(scope.index);
		},
		templateUrl: '/partials/popup.html'
	}
});